import { Router } from 'express';
import { getJournal } from '../controllers/journal.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/', getJournal);

export default router;
