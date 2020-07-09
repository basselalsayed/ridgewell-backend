'use strict';

import { Router } from 'express';
import { verifyToken, isAdmin } from '../middleware';
import {
  getAllRequests,
  newUpdateRequest,
  // newDeleteRequest,
} from '../controllers';

const router = Router();

router.get('/', [verifyToken], getAllRequests);

router.put('/:holidayId', [verifyToken, isAdmin], newUpdateRequest);

// router.delete('/:holidayId', [verifyToken, isAdmin], newDeleteRequest);

export default router;
