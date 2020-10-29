'use strict';

import { Router } from 'express';
import { verifyToken, isAdmin, isOwner } from '../middleware';
import { getAllRequests, newRequest } from '../controllers';
import { confirmHolidayRequest } from '../services/holidayRequest';

const router = Router();

router.get('/', [verifyToken, isAdmin], getAllRequests);

router.post('/', [verifyToken, isOwner], newRequest);

router.put(
  '/:requestId/confirm',
  [verifyToken, isAdmin],
  confirmHolidayRequest,
);

export default router;
