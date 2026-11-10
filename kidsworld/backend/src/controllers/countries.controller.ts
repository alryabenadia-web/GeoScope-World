import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

export const getAllCountries = async (req: AuthRequest, res: Response) => {
  try {
    const countries = await prisma.country.findMany({
      orderBy: { name_en: 'asc' },
    });

    const visitedCountries = await prisma.visitedCountry.findMany({
      where: { user_id: req.user!.id },
      select: { country_id: true },
    });

    const visitedIds = new Set(visitedCountries.map((vc) => vc.country_id));

    const countriesWithVisited = countries.map((country) => ({
      ...country,
      population: country.population ? country.population.toString() : null,
      area: country.area ? country.area.toString() : null,
      visited: visitedIds.has(country.id),
    }));

    res.json(countriesWithVisited);
  } catch (error) {
    console.error('Get countries error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getCountryByCode = async (req: AuthRequest, res: Response) => {
  try {
    const { code } = req.params;

    const country = await prisma.country.findUnique({
      where: { code: code.toUpperCase() },
      include: {
        quizzes: true,
      },
    });

    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }

    const visited = await prisma.visitedCountry.findUnique({
      where: {
        user_id_country_id: {
          user_id: req.user!.id,
          country_id: country.id,
        },
      },
    });

    res.json({
      ...country,
      population: country.population ? country.population.toString() : null,
      area: country.area ? country.area.toString() : null,
      visited: !!visited,
    });
  } catch (error) {
    console.error('Get country error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const visitCountry = async (req: AuthRequest, res: Response) => {
  try {
    const { code } = req.params;

    const country = await prisma.country.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }

    const existing = await prisma.visitedCountry.findUnique({
      where: {
        user_id_country_id: {
          user_id: req.user!.id,
          country_id: country.id,
        },
      },
    });

    if (existing) {
      return res.json({ message: 'Country already visited', visited: existing });
    }

    const visited = await prisma.visitedCountry.create({
      data: {
        user_id: req.user!.id,
        country_id: country.id,
      },
    });

    await prisma.profile.update({
      where: { user_id: req.user!.id },
      data: {
        total_points: {
          increment: 5,
        },
      },
    });

    res.status(201).json({ message: 'Country visited', visited });
  } catch (error: any) {
    console.error('Visit country error:', error);

    // Handle duplicate visit (Prisma P2002 error)
    if (error.code === 'P2002') {
      return res.json({ message: 'Country already visited' });
    }

    res.status(500).json({ message: 'Internal server error' });
  }
};
