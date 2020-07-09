import { handleError } from './helpers';

const getAll = async (req, res) =>
  res.send({ holidays: await req.context.models.Holiday.findAll() });

const getOne = async (req, res) =>
  res.send({
    holiday: await req.context.models.Holiday.findByPk(req.params.holidayId),
  });

const updateHoliday = async (req, res) => {
  await req.context.models.Holiday.update(
    { ...req.body.holiday },
    {
      where: { id: req.params.holidayId },
    },
  )
    .then(
      holiday => holiday[0] > 0 && res.status(200).send({ message: 'Success' }),
    )
    .catch(err => handleError(err));
};

export { getAll, getOne, updateHoliday };
