import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

export const getJournal = async (req: AuthRequest, res: Response) => {
  try {
    const visits = await prisma.visitedCountry.findMany({
      where: { user_id: req.user!.id },
      include: {
        country: true,
      },
      orderBy: { visited_at: 'desc' },
    });

    // Convert BigInt fields to strings
    const visitsWithStringFields = visits.map(visit => ({
      ...visit,
      country: visit.country ? {
        ...visit.country,
        population: visit.country.population ? visit.country.population.toString() : null,
        area: visit.country.area ? visit.country.area.toString() : null,
      } : null,
    }));

    res.json(visitsWithStringFields);
  } catch (error) {
    console.error('Get journal error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
