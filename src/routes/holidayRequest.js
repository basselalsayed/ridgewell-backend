'use strict';

import { Router } from 'express';
import { verifyToken, isAdmin, isOwner } from '../middleware';
import {
  confirmRequest,
  denyRequest,
  getAllRequests,
  newRequest,
} from '../controllers';

const router = Router();

router.get('/', [verifyToken], getAllRequests);

router.post('/', [verifyToken, isOwner], newRequest);

router.put('/:requestId/confirm', [verifyToken, isAdmin], confirmRequest);

router.put('/:requestId/deny', [verifyToken, isAdmin], denyRequest);

export default router;
