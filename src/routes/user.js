'use strict';

import { Router } from 'express';
import { userBoard, adminBoard, signUp, getAllUsers } from '../controllers';

import {
  verifyToken,
  isAdmin,
  checkDuplicateUsernameOrEmail,
  checkRolesExist,
} from '../middleware';

const router = Router();

router.get('/', [verifyToken, isAdmin], getAllUsers);

router.post('/', [checkDuplicateUsernameOrEmail, checkRolesExist], signUp);

router.get('/:userId', [verifyToken], userBoard);

router.get('/admin', [verifyToken, isAdmin], adminBoard);

export default router;
