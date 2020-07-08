'use strict';

import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const user = await req.context.models.User.findByPk(req.context.user.id);
  return res.send(user);
});

export default router;
