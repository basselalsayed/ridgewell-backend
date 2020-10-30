'use strict';

import { Router } from 'express';
import { verifyToken, isAdmin, isOwner } from '../middleware';
import { confirmRequest, getAllRequests, newRequest } from '../controllers';

const router = Router();

router.get('/', [verifyToken, isAdmin], getAllRequests);

router.post('/', [verifyToken, isOwner], newRequest);

router.put('/:requestId/confirm', [verifyToken, isAdmin], confirmRequest);

export default router;
