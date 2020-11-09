'use strict';

import { Router } from 'express';
import { verifyToken, isNotificationOwner } from '../middleware';
import { getAll, updateHoliday } from '../controllers';

const router = Router();

router.get('/', [verifyToken, isNotificationOwner], getAll);

router.put(
  '/:notificationId',
  [verifyToken, isNotificationOwner],
  updateHoliday,
);

export default router;
