'use strict';

import { Router } from 'express';
import { verifyToken, isNotificationOwner } from '../middleware';
import { getAllNotifications, updateNotification } from '../controllers';

const router = Router();

router.get('/', [verifyToken, isNotificationOwner], getAllNotifications);

router.put(
  '/:notificationId',
  [verifyToken, isNotificationOwner],
  updateNotification,
);

export default router;
