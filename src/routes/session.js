import { Router } from 'express';

const router = Router();

router.get('/', (req, res) =>
  res.send(req.context.models.users[req.context.user.id]),
);

export default router;
