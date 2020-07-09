import { handleError, send200, send500 } from './helpers';
import { Sequelize } from 'sequelize';
const Op = Sequelize.Op;
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
    .then(holiday => holiday[0] > 0 && send200(res, { message: 'Success' }))
    .catch(err => handleError(err));
};

const newHoliday = async (req, res) => {
  const where = {
    [Op.or]: [
      {
        from: {
          [Op.between]: [req.body.from, req.body.until],
        },
      },
      {
        until: {
          [Op.between]: [req.body.from, req.body.until],
        },
      },
    ],
  };

  await req.context.models.Holiday.findAll({ where }).then(async response =>
    response.length
      ? send500(res, { message: 'Holiday already present' })
      : send200(res, {
          holiday: await req.context.models.Holiday.create({
            from: req.body.from,
            until: req.body.until,
            userId: req.body.userId,
          }),
        }),
  );
};

const deleteHoliday = async (req, res) =>
  await req.context.models.Holiday.destroy({
    where: { id: req.params.holidayId },
  })
    .then(holiday =>
      holiday
        ? send200(res, { message: 'Holiday Deleted' })
        : send500(res, { message: 'Holiday Not Found' }),
    )
    .catch(err => handleError(err));

export { deleteHoliday, getAll, getOne, newHoliday, updateHoliday };
