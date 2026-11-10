import { Router } from 'express';
import {
  getCurrentUser,
  getProfile,
  updateProfile,
  getStatistics,
  getAchievements,
} from '../controllers/profile.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/me', getCurrentUser);
router.get('/me/profile', getProfile);
router.patch('/me', updateProfile);
router.get('/me/statistics', getStatistics);
router.get('/me/achievements', getAchievements);

export default router;
