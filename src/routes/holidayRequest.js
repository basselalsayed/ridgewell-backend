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

router.put('/:holidayId', [verifyToken], newUpdateRequest);

router.delete('/:holidayId', [verifyToken], newDeleteRequest);

export default router;
