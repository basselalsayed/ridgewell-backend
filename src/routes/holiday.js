'use strict';

import { Router } from 'express';
import { verifyToken, isAdmin } from '../middleware';

const router = Router();

router.get('/', async (req, res) => {
  const holidays = await req.context.models.Holiday.findAll();
  return res.send(holidays);
});

router.get('/:holidayId', async (req, res) => {
  const holiday = await req.context.models.Holiday.findByPk(
    req.params.holidayId,
  );
  return res.send(holiday);
});

router.update('/:holidayId', [verifyToken, isAdmin], async (req, res) => {
  const holiday = await req.context.models.Holiday.findByPk(
    req.params.holidayId,
  );
  return res.send(holiday);
});

router.post('/', [verifyToken], async (req, res) => {
  const holiday = await req.context.models.Holiday.create({
    from: req.body.from,
    until: req.body.from,
    userId: req.body.userId,
  });

  return res.send(holiday);
});

router.delete('/:messageId', async (req, res) => {
  const result = await req.context.models.Message.destroy({
    where: { id: req.params.messageId },
  });

  return res.send(true);
});

export default router;
