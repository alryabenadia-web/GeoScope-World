import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { AuthRequest } from '../middleware/auth.middleware';
import { quizGeneratorService } from '../services/quizGenerator.service';

const prisma = new PrismaClient();

const submitAnswerSchema = z.object({
  answer: z.string(),
});

const submitDynamicQuizSessionSchema = z.object({
  countryCode: z.string(),
  attempts: z.array(z.object({
    question: z.string(),
    selectedAnswer: z.string(),
    correctAnswer: z.string(),
    isCorrect: z.boolean(),
    points: z.number(),
    difficulty: z.string(),
  })),
  totalScore: z.number(),
  correctCount: z.number(),
});

export const getQuizzesByCountry = async (req: AuthRequest, res: Response) => {
  try {
    const { countryCode } = req.params;

    const country = await prisma.country.findUnique({
      where: { code: countryCode.toUpperCase() },
    });

    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }

    const quizzes = await prisma.quiz.findMany({
      where: { country_id: country.id },
      orderBy: { difficulty: 'asc' },
    });

    const attempts = await prisma.quizAttempt.findMany({
      where: {
        user_id: req.user!.id,
        quiz_id: { in: quizzes.map((q) => q.id) },
      },
      orderBy: { attempted_at: 'desc' },
    });

    const attemptMap = new Map();
    attempts.forEach((attempt) => {
      if (!attemptMap.has(attempt.quiz_id)) {
        attemptMap.set(attempt.quiz_id, attempt);
      }
    });

    const quizzesWithAttempts = quizzes.map((quiz) => ({
      ...quiz,
      last_attempt: attemptMap.get(quiz.id) || null,
    }));

    res.json(quizzesWithAttempts);
  } catch (error) {
    console.error('Get quizzes error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const submitQuiz = async (req: AuthRequest, res: Response) => {
  try {
    const { quizId } = req.params;
    const validated = submitAnswerSchema.parse(req.body);

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
    });

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const isCorrect = validated.answer.toLowerCase().trim() === quiz.correct_answer.toLowerCase().trim();
    const pointsEarned = isCorrect ? quiz.points : 0;

    const attempt = await prisma.quizAttempt.create({
      data: {
        user_id: req.user!.id,
        quiz_id: quiz.id,
        answer: validated.answer,
        is_correct: isCorrect,
        points_earned: pointsEarned,
      },
    });

    if (isCorrect) {
      await prisma.profile.update({
        where: { user_id: req.user!.id },
        data: {
          total_points: {
            increment: pointsEarned,
          },
        },
      });
    }

    res.status(201).json({
      is_correct: isCorrect,
      points_earned: pointsEarned,
      correct_answer: quiz.correct_answer,
      attempt,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    console.error('Submit quiz error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getQuizAttempts = async (req: AuthRequest, res: Response) => {
  try {
    const attempts = await prisma.quizAttempt.findMany({
      where: { user_id: req.user!.id },
      include: {
        quiz: {
          include: {
            country: true,
          },
        },
      },
      orderBy: { attempted_at: 'desc' },
      take: 50,
    });

    res.json(attempts);
  } catch (error) {
    console.error('Get attempts error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Get dynamically generated quizzes for a country
 * This replaces static database quizzes with fresh, randomized questions on every request
 */
export const getDynamicQuizzes = async (req: AuthRequest, res: Response) => {
  try {
    const { countryCode } = req.params;
    const questionCount = req.query.count ? parseInt(req.query.count as string) : 5;

    // Validate country exists
    const country = await prisma.country.findUnique({
      where: { code: countryCode.toUpperCase() },
    });

    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }

    // Generate dynamic quizzes
    const quizzes = await quizGeneratorService.generateQuizzesForCountry(
      countryCode.toUpperCase(),
      questionCount
    );

    // Add required fields for frontend compatibility
    const quizzesWithIds = quizzes.map((quiz, index) => ({
      id: `dynamic-${country.id}-${Date.now()}-${index}`,
      country_id: country.id,
      ...quiz,
    }));

    res.json(quizzesWithIds);
  } catch (error) {
    console.error('Get dynamic quizzes error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Submit completed dynamic quiz session and award points
 * This endpoint handles quiz results from dynamically generated quizzes
 */
export const submitDynamicQuizSession = async (req: AuthRequest, res: Response) => {
  try {
    console.log('=== QUIZ SUBMISSION RECEIVED ===');
    console.log('User ID:', req.user?.id);
    console.log('Country Code:', req.body.countryCode);
    console.log('Total Score:', req.body.totalScore);
    console.log('Correct Count:', req.body.correctCount);
    console.log('Attempts count:', req.body.attempts?.length);
    console.log('First attempt sample:', JSON.stringify(req.body.attempts?.[0], null, 2));

    const validated = submitDynamicQuizSessionSchema.parse(req.body);

    // Validate country exists
    const country = await prisma.country.findUnique({
      where: { code: validated.countryCode.toUpperCase() },
    });

    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }

    // Verify total score matches sum of attempt points (prevent cheating)
    const calculatedScore = validated.attempts
      .filter(a => a.isCorrect)
      .reduce((sum, a) => sum + a.points, 0);

    if (calculatedScore !== validated.totalScore) {
      return res.status(400).json({
        message: 'Score mismatch detected',
        calculated: calculatedScore,
        submitted: validated.totalScore,
      });
    }

    // Award points to user profile
    if (validated.totalScore > 0) {
      await prisma.profile.update({
        where: { user_id: req.user!.id },
        data: {
          total_points: {
            increment: validated.totalScore,
          },
        },
      });
    }

    // Create quiz attempt records for tracking (quiz_id is null for dynamic quizzes)
    const attemptPromises = validated.attempts.map(async (attempt) => {
      return prisma.quizAttempt.create({
        data: {
          user_id: req.user!.id,
          quiz_id: null,  // null for dynamic quizzes (no database quiz record)
          answer: attempt.selectedAnswer,
          is_correct: attempt.isCorrect,
          points_earned: attempt.isCorrect ? attempt.points : 0,
        },
      });
    });

    await Promise.all(attemptPromises);

    // Update daily challenge progress (if today's challenge is quiz-related)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayChallenge = await prisma.dailyChallenge.findUnique({
      where: { challenge_date: today },
    });

    if (todayChallenge && todayChallenge.challenge_type === 'quiz') {
      const userChallenge = await prisma.userDailyChallenge.findUnique({
        where: {
          user_id_challenge_id: {
            user_id: req.user!.id,
            challenge_id: todayChallenge.id,
          },
        },
      });

      if (userChallenge && !userChallenge.completed) {
        const newProgress = userChallenge.progress + 1;
        const isCompleted = newProgress >= todayChallenge.target_value;

        await prisma.userDailyChallenge.update({
          where: { id: userChallenge.id },
          data: {
            progress: newProgress,
            completed: isCompleted,
          },
        });

        // Award bonus points if challenge completed
        if (isCompleted && !userChallenge.completed) {
          await prisma.profile.update({
            where: { user_id: req.user!.id },
            data: {
              total_points: {
                increment: todayChallenge.reward_points,
              },
            },
          });
        }
      }
    }

    // Get updated profile
    const updatedProfile = await prisma.profile.findUnique({
      where: { user_id: req.user!.id },
    });

    res.status(201).json({
      success: true,
      points_awarded: validated.totalScore,
      correct_count: validated.correctCount,
      total_questions: validated.attempts.length,
      new_total_points: updatedProfile?.total_points || 0,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error details:', JSON.stringify(error.errors, null, 2));
      return res.status(400).json({
        message: 'Validation error',
        errors: error.errors,
        details: error.errors.map(e => `${e.path.join('.')}: ${e.message}`)
      });
    }
    console.error('Submit dynamic quiz session error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
