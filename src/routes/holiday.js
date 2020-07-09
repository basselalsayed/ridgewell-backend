'use strict';

import { Router } from 'express';
import { verifyToken, isAdmin } from '../middleware';
import { getAll } from '../controllers';
const router = Router();

router.get('/', [verifyToken], getAll);

router.get('/:holidayId', [verifyToken], async (req, res) => {
  const holiday = await req.context.models.Holiday.findByPk(
    req.params.holidayId,
  );
  return res.send({ holiday });
});

router.put('/:holidayId', [verifyToken, isAdmin], async (req, res) => {
  await req.context.models.Holiday.update(
    { ...req.body.holiday },
    {
      where: { id: req.params.holidayId },
    },
  )
    .then(holiday => holiday && res.status(200).send({ message: 'Success' }))
    .catch(err => res.status(500).send({ message: err.message }));
  return res.send(holiday);
});

router.post('/', [verifyToken], async (req, res) => {
  const holiday = await req.context.models.Holiday.create({
    from: req.body.from,
    until: req.body.until,
    userId: req.body.userId,
  });

  return res.send(holiday);
});

router.delete('/:messageId', async (req, res) => {
  await req.context.models.Message.destroy({
    where: { id: req.params.messageId },
  }).on('success', () => res.send(true));
});

export default router;
