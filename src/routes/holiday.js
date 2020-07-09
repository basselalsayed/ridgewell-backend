'use strict';

import { Router } from 'express';
import { verifyToken, isAdmin } from '../middleware';
import {
  deleteHoliday,
  getAll,
  getOne,
  updateHoliday,
  newHoliday,
} from '../controllers';

const router = Router();

router.get('/', [verifyToken], getAll);

router.get('/:holidayId', [verifyToken], getOne);

router.put('/:holidayId', [verifyToken, isAdmin], updateHoliday);

router.post('/', [verifyToken], newHoliday);

router.delete('/:holidayId', [verifyToken, isAdmin], deleteHoliday);

export default router;
