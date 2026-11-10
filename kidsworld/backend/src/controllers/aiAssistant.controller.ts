import { Response } from 'express';
import { z } from 'zod';
import { AuthRequest } from '../middleware/auth.middleware';
import { aiAssistantService } from '../services/aiAssistant.service';

const askQuestionSchema = z.object({
  question: z.string().min(1).max(500),
  language: z.enum(['en', 'ar']).optional().default('en'),
});

/**
 * Ask the Map - Child-safe AI assistant endpoint
 */
export const askTheMap = async (req: AuthRequest, res: Response) => {
  try {
    const validated = askQuestionSchema.parse(req.body);

    const answer = await aiAssistantService.askQuestion(
      validated.question,
      validated.language
    );

    res.json({
      question: validated.question,
      answer,
      language: validated.language,
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Invalid request',
        errors: error.errors
      });
    }

    console.error('Ask the Map error:', error);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
};
