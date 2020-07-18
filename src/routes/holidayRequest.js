'use strict';

import { Router } from 'express';
import { verifyToken, isAdmin } from '../middleware';
import {
  getAllRequests,
  newUpdateRequest,
  newDeleteRequest,
} from '../controllers';

const router = Router();

router.get('/', [verifyToken, isAdmin], getAllRequests);

router.post('/upd/:holidayId', [verifyToken], newUpdateRequest);

router.post('/del/:holidayId', [verifyToken], newDeleteRequest);

export default router;
