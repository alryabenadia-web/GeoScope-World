import { Router } from 'express';
import {
  getQuizzesByCountry,
  submitQuiz,
  getQuizAttempts,
  getDynamicQuizzes,
  submitDynamicQuizSession,
} from '../controllers/quizzes.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

// Specific routes FIRST (before parameterized routes)
router.get('/country/:countryCode/dynamic', getDynamicQuizzes);
router.post('/dynamic/submit', submitDynamicQuizSession);
router.get('/attempts', getQuizAttempts);

// Parameterized routes LAST
router.get('/country/:countryCode', getQuizzesByCountry);
router.post('/:quizId/submit', submitQuiz);

export default router;
