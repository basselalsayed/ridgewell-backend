'use strict';

import { Router } from 'express';
import { allAccess, userBoard, adminBoard } from '../controllers';
import { verifyToken, isAdmin } from '../middleware';

const router = Router();

router.get('/', [verifyToken, isAdmin], allAccess);

router.get('/:userId', [verifyToken], userBoard);

router.get('/admin', [verifyToken, isAdmin], adminBoard);

export default router;
