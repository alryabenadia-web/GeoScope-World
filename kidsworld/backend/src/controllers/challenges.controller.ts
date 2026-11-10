import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

const CHALLENGE_TYPES = [
  {
    type: 'visit_countries',
    target: 5,
    points: 50,
    desc_en: 'Visit 5 different countries today',
    desc_ar: 'قم بزيارة 5 دول مختلفة اليوم'
  },
  {
    type: 'complete_quizzes',
    target: 3,
    points: 75,
    desc_en: 'Complete 3 country quizzes',
    desc_ar: 'أكمل 3 اختبارات عن الدول'
  },
  {
    type: 'earn_points',
    target: 100,
    points: 100,
    desc_en: 'Earn 100 points today',
    desc_ar: 'اكسب 100 نقطة اليوم'
  },
  {
    type: 'explore_continents',
    target: 3,
    points: 60,
    desc_en: 'Explore countries from 3 different continents',
    desc_ar: 'استكشف دول من 3 قارات مختلفة'
  }
];

function getTodayDate(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export const getDailyChallenge = async (req: AuthRequest, res: Response) => {
  try {
    const today = getTodayDate();

    let challenge = await prisma.dailyChallenge.findUnique({
      where: { challenge_date: today }
    });

    if (!challenge) {
      const randomChallenge = CHALLENGE_TYPES[Math.floor(Math.random() * CHALLENGE_TYPES.length)];

      challenge = await prisma.dailyChallenge.create({
        data: {
          challenge_date: today,
          challenge_type: randomChallenge.type,
          target_value: randomChallenge.target,
          reward_points: randomChallenge.points,
          description_en: randomChallenge.desc_en,
          description_ar: randomChallenge.desc_ar
        }
      });
    }

    let userChallenge = null;
    if (req.user) {
      userChallenge = await prisma.userDailyChallenge.findUnique({
        where: {
          user_id_challenge_id: {
            user_id: req.user.id,
            challenge_id: challenge.id
          }
        }
      });

      if (!userChallenge) {
        userChallenge = await prisma.userDailyChallenge.create({
          data: {
            user_id: req.user.id,
            challenge_id: challenge.id,
            progress: 0,
            completed: false
          }
        });
      }
    }

    res.json({
      challenge: {
        id: challenge.id,
        challenge_type: challenge.challenge_type,
        target_value: challenge.target_value,
        reward_points: challenge.reward_points,
        description_en: challenge.description_en,
        description_ar: challenge.description_ar,
        challenge_date: challenge.challenge_date.toISOString().split('T')[0]
      },
      userProgress: userChallenge ? {
        id: userChallenge.id,
        progress: userChallenge.progress,
        completed: userChallenge.completed
      } : null
    });
  } catch (error) {
    console.error('Get daily challenge error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getDailyChallengeProgress = async (req: AuthRequest, res: Response) => {
  try {
    const today = getTodayDate();

    const challenge = await prisma.dailyChallenge.findUnique({
      where: { challenge_date: today }
    });

    if (!challenge) {
      return res.json({ progress: 0, completed: false });
    }

    const userChallenge = await prisma.userDailyChallenge.findUnique({
      where: {
        user_id_challenge_id: {
          user_id: req.user!.id,
          challenge_id: challenge.id
        }
      }
    });

    if (!userChallenge) {
      return res.json({ progress: 0, completed: false });
    }

    // Calculate current progress based on challenge type
    let currentProgress = userChallenge.progress;

    if (!userChallenge.completed) {
      const startOfDay = getTodayDate();
      const endOfDay = new Date(startOfDay);
      endOfDay.setDate(endOfDay.getDate() + 1);

      switch (challenge.challenge_type) {
        case 'visit_countries':
          currentProgress = await prisma.visitedCountry.count({
            where: {
              user_id: req.user!.id,
              visited_at: {
                gte: startOfDay,
                lt: endOfDay
              }
            }
          });
          break;
        case 'complete_quizzes':
          currentProgress = await prisma.quizAttempt.count({
            where: {
              user_id: req.user!.id,
              attempted_at: {
                gte: startOfDay,
                lt: endOfDay
              }
            }
          });
          break;
        case 'earn_points':
          const attempts = await prisma.quizAttempt.aggregate({
            where: {
              user_id: req.user!.id,
              attempted_at: {
                gte: startOfDay,
                lt: endOfDay
              }
            },
            _sum: {
              points_earned: true
            }
          });
          currentProgress = attempts._sum.points_earned || 0;
          break;
        case 'explore_continents':
          const visited = await prisma.visitedCountry.findMany({
            where: {
              user_id: req.user!.id,
              visited_at: {
                gte: startOfDay,
                lt: endOfDay
              }
            },
            include: {
              country: {
                select: { continent: true }
              }
            }
          });
          const uniqueContinents = new Set(visited.map(v => v.country.continent));
          currentProgress = uniqueContinents.size;
          break;
      }

      // Update stored progress
      await prisma.userDailyChallenge.update({
        where: { id: userChallenge.id },
        data: { progress: currentProgress }
      });
    }

    res.json({
      progress: currentProgress,
      completed: userChallenge.completed,
      target: challenge.target_value
    });
  } catch (error) {
    console.error('Get daily challenge progress error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const claimDailyChallengeReward = async (req: AuthRequest, res: Response) => {
  try {
    const today = getTodayDate();

    const challenge = await prisma.dailyChallenge.findUnique({
      where: { challenge_date: today }
    });

    if (!challenge) {
      return res.status(404).json({ message: 'No challenge found for today' });
    }

    const userChallenge = await prisma.userDailyChallenge.findUnique({
      where: {
        user_id_challenge_id: {
          user_id: req.user!.id,
          challenge_id: challenge.id
        }
      }
    });

    if (!userChallenge) {
      return res.status(404).json({ message: 'Challenge not started' });
    }

    if (userChallenge.completed) {
      return res.status(400).json({ message: 'Reward already claimed' });
    }

    if (userChallenge.progress < challenge.target_value) {
      return res.status(400).json({ message: 'Challenge not completed yet' });
    }

    // Mark as completed and add points
    await prisma.$transaction([
      prisma.userDailyChallenge.update({
        where: { id: userChallenge.id },
        data: { completed: true }
      }),
      prisma.profile.update({
        where: { user_id: req.user!.id },
        data: {
          total_points: {
            increment: challenge.reward_points
          }
        }
      })
    ]);

    res.json({
      success: true,
      points_earned: challenge.reward_points,
      message: 'Reward claimed successfully!'
    });
  } catch (error) {
    console.error('Claim daily challenge reward error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
