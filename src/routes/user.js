'use strict';

import { Router } from 'express';
import { allAccess, userBoard, adminBoard, signUp } from '../controllers';
import {
  verifyToken,
  isAdmin,
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
} from '../middleware';

const router = Router();

router.get('/', [verifyToken, isAdmin], allAccess);

router.post('/', [checkDuplicateUsernameOrEmail, checkRolesExisted], signUp);

router.get('/:userId', [verifyToken], userBoard);

router.get('/admin', [verifyToken, isAdmin], adminBoard);

export default router;
