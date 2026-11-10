import { Router } from 'express';
import { askTheMap } from '../controllers/aiAssistant.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

// Ask the Map - Child-safe AI assistant
router.post('/ask', askTheMap);

export default router;
