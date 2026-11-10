import { Router } from 'express';
import {
  getAllCountries,
  getCountryByCode,
  visitCountry,
} from '../controllers/countries.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/', getAllCountries);
router.get('/:code', getCountryByCode);
router.post('/:code/visit', visitCountry);

export default router;
