import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { AuthRequest } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

const updateProfileSchema = z.object({
  username: z.string().min(3).max(50).optional(),
  avatar_style: z.any().optional(),
  language_preference: z.string().optional(),
});

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        username: true,
        role: true,
        created_at: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user.id,
      username: user.username,
      role: user.role.toLowerCase(),
      created_at: user.created_at,
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: { user_id: req.user!.id },
    });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const validated = updateProfileSchema.parse(req.body);

    const profile = await prisma.profile.update({
      where: { user_id: req.user!.id },
      data: validated,
    });

    res.json(profile);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getStatistics = async (req: AuthRequest, res: Response) => {
  try {
    const [profile, totalAttempts, correctAttempts, visitedCount, achievements] = await Promise.all([
      prisma.profile.findUnique({
        where: { user_id: req.user!.id },
      }),
      prisma.quizAttempt.count({
        where: { user_id: req.user!.id },
      }),
      prisma.quizAttempt.count({
        where: {
          user_id: req.user!.id,
          is_correct: true,
        },
      }),
      prisma.visitedCountry.count({
        where: { user_id: req.user!.id },
      }),
      prisma.userAchievement.count({
        where: { user_id: req.user!.id },
      }),
    ]);

    const accuracy = totalAttempts > 0 ? (correctAttempts / totalAttempts) * 100 : 0;

    res.json({
      total_points: profile?.total_points || 0,
      countries_visited: visitedCount,
      quizzes_completed: totalAttempts,
      correct_answers: correctAttempts,
      accuracy: Math.round(accuracy),
      achievements_earned: achievements,
    });
  } catch (error) {
    console.error('Get statistics error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAchievements = async (req: AuthRequest, res: Response) => {
  try {
    const [allAchievements, userAchievements] = await Promise.all([
      prisma.achievement.findMany({
        orderBy: { created_at: 'asc' }
      }),
      prisma.userAchievement.findMany({
        where: { user_id: req.user!.id },
        select: {
          achievement_id: true,
          earned_at: true
        }
      })
    ]);

    const userAchievementMap = new Map(
      userAchievements.map(ua => [ua.achievement_id, ua.earned_at])
    );

    const achievementsWithStatus = allAchievements.map(achievement => ({
      id: achievement.id,
      name: achievement.name,
      description: achievement.description,
      icon: achievement.icon,
      points: achievement.points,
      criteria: achievement.criteria,
      unlocked: userAchievementMap.has(achievement.id),
      unlocked_at: userAchievementMap.get(achievement.id) || null
    }));

    res.json(achievementsWithStatus);
  } catch (error) {
    console.error('Get achievements error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
