'use strict';

import { Router } from 'express';
import { verifyToken, isAdmin, isOwner } from '../middleware';
import {
  getAllRequests,
  newUpdateRequest,
  newDeleteRequest,
} from '../controllers';

const router = Router();

router.get('/', [verifyToken, isAdmin], getAllRequests);

router.post('/upd/:holidayId', [verifyToken, isOwner], newUpdateRequest);

router.post('/del/:holidayId', [verifyToken, isOwner], newDeleteRequest);

export default router;
