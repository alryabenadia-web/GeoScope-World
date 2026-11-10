import { Router } from 'express';
import {
  getDailyChallenge,
  getDailyChallengeProgress,
  claimDailyChallengeReward
} from '../controllers/challenges.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/daily', getDailyChallenge);
router.get('/daily/progress', getDailyChallengeProgress);
router.post('/daily/claim', claimDailyChallengeReward);

export default router;
