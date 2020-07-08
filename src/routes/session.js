'use strict';
import { signIn, signUp } from '../controllers';
import {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
} from '../middleware';
import { Router } from 'express';

const router = Router();

router.post('/signin', signIn);

router.post(
  '/signup',
  [checkDuplicateUsernameOrEmail, checkRolesExisted],
  signUp,
);

// router.get('/', async (req, res) => {
//   const user = await req.context.models.User.findByPk(req.context.user.id);
//   return res.send(user);
// });

export default router;
