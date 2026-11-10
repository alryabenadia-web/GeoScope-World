import { Router } from 'express';
import {
  getChildStatistics,
  getLeaderboard,
} from '../controllers/parent.controller';
import { authenticate, requireRole } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/children/:childId/statistics', requireRole('PARENT'), getChildStatistics);
router.get('/leaderboard', getLeaderboard);

export default router;
