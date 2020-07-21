import { handleError, send } from './helpers';
import { Sequelize } from 'sequelize';

const Op = Sequelize.Op;
const getAll = async (req, res) =>
  send(200, res, {
    holidays: await req.context.models.Holiday.findAll({
      include: [
        {
          model: req.context.models.HolidayRequest,
          attributes: ['id', 'type', 'from', 'until', 'resolved'],
        },
        {
          model: req.context.models.User,
          attributes: ['username', 'email'],
        },
      ],
    }),
  });

const getOne = async (req, res) =>
  send(200, res, {
    holiday: await req.context.models.Holiday.findByPk(req.params.holidayId),
  });

const updateHoliday = async (req, res) => {
  await req.context.models.Holiday.update(
    { ...req.body.holiday },
    {
      where: { id: req.params.holidayId },
    },
  )
    .then(holiday => holiday[0] > 0 && send(200, res, { message: 'Success' }))
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
    response.length === 2
      ? send(500, res, { message: 'Two Staff on Holiday already ' })
      : send(200, res, {
          holiday: await req.context.models.Holiday.create(
            {
              from: req.body.from,
              until: req.body.until,
              userId: req.userId,
              holidayRequests: [
                {
                  type: 'new',
                  from: req.body.from,
                  owner: req.userId,
                  until: req.body.until,
                },
              ],
            },
            {
              include: [req.context.models.HolidayRequest],
            },
          ),
        }),
  );
};

const deleteHoliday = async (req, res) =>
  await req.context.models.Holiday.destroy({
    where: { id: req.params.holidayId },
  })
    .then(holiday =>
      holiday
        ? send(200, res, { message: 'Holiday Deleted' })
        : send(500, res, { message: 'Holiday Not Found' }),
    )
    .catch(err => handleError(err));

export { deleteHoliday, getAll, getOne, newHoliday, updateHoliday };
