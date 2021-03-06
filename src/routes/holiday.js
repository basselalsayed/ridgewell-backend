'use strict';

import { Router } from 'express';
import { verifyToken, isAdmin, isQueryOwner } from '../middleware';
import {
  deleteHoliday,
  getAll,
  getOne,
  updateHoliday,
  newHoliday,
} from '../controllers';

const router = Router();

router.get('/', [verifyToken, isQueryOwner], getAll);

router.post('/', [verifyToken], newHoliday);

router.get('/:holidayId', [verifyToken], getOne);

router.put('/:holidayId', [verifyToken, isAdmin], updateHoliday);

router.delete('/:holidayId', [verifyToken, isAdmin], deleteHoliday);

export default router;
