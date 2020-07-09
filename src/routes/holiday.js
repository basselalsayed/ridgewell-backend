'use strict';

import { Router } from 'express';
import { verifyToken, isAdmin } from '../middleware';
import { getAll, getOne, updateHoliday } from '../controllers';
const router = Router();

router.get('/', [verifyToken], getAll);

router.get('/:holidayId', [verifyToken], getOne);

router.put('/:holidayId', [verifyToken, isAdmin], updateHoliday);

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
