'use strict';

import { Router } from 'express';
import { allAccess, userBoard, adminBoard } from '../controllers';
import { verifyToken, isAdmin } from '../middleware';

const router = Router();

router.get('/', allAccess);

router.get('/:userId', [verifyToken], userBoard);

// router.get('/:userId', async (req, res) => {
//   const user = await req.context.models.User.findByPk(req.params.userId);
//   return res.send(user);
// });

router.get('/admin', [verifyToken, isAdmin], adminBoard);

export default router;
