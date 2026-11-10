import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

export const getChildStatistics = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user!.role !== 'PARENT') {
      return res.status(403).json({ message: 'Only parents can access this endpoint' });
    }

    const { childId } = req.params;

    const [profile, totalAttempts, correctAttempts, visitedCount, achievements, recentActivity] = await Promise.all([
      prisma.profile.findUnique({
        where: { user_id: childId },
      }),
      prisma.quizAttempt.count({
        where: { user_id: childId },
      }),
      prisma.quizAttempt.count({
        where: {
          user_id: childId,
          is_correct: true,
        },
      }),
      prisma.visitedCountry.count({
        where: { user_id: childId },
      }),
      prisma.userAchievement.count({
        where: { user_id: childId },
      }),
      prisma.quizAttempt.findMany({
        where: { user_id: childId },
        include: {
          quiz: {
            include: {
              country: true,
            },
          },
        },
        orderBy: { attempted_at: 'desc' },
        take: 10,
      }),
    ]);

    if (!profile) {
      return res.status(404).json({ message: 'Child profile not found' });
    }

    const accuracy = totalAttempts > 0 ? (correctAttempts / totalAttempts) * 100 : 0;

    res.json({
      profile,
      statistics: {
        total_points: profile.total_points,
        countries_visited: visitedCount,
        quizzes_completed: totalAttempts,
        correct_answers: correctAttempts,
        accuracy: Math.round(accuracy),
        achievements_earned: achievements,
      },
      recent_activity: recentActivity,
    });
  } catch (error) {
    console.error('Get child statistics error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getLeaderboard = async (req: AuthRequest, res: Response) => {
  try {
    const profiles = await prisma.profile.findMany({
      where: {
        is_parent: false,
      },
      orderBy: {
        total_points: 'desc',
      },
      take: 10,
      select: {
        user_id: true,
        username: true,
        total_points: true,
        avatar_style: true,
      },
    });

    const leaderboard = await Promise.all(
      profiles.map(async (profile, index) => {
        const [visitedCount, quizzesCompleted] = await Promise.all([
          prisma.visitedCountry.count({
            where: { user_id: profile.user_id },
          }),
          prisma.quizAttempt.count({
            where: { user_id: profile.user_id },
          }),
        ]);

        return {
          rank: index + 1,
          user_id: profile.user_id,
          username: profile.username,
          total_points: profile.total_points,
          avatar_style: profile.avatar_style,
          countries_visited: visitedCount,
          quizzes_completed: quizzesCompleted,
        };
      })
    );

    res.json(leaderboard);
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
