import { send, handleError } from '../controllers/helpers';

const allHolidaysService = async (
  {
    context: {
      models: { Holiday, HolidayRequest, User },
    },
  },
  res,
) => {
  try {
    const holidays = await Holiday.findAll({
      include: [
        {
          model: HolidayRequest,
          attributes: ['id', 'type', 'from', 'until', 'resolved'],
        },
        {
          model: User,
          attributes: ['username', 'email'],
        },
      ],
    });

    if (holidays) send(200, res, { holidays });
  } catch (error) {
    console.log(error);
    handleError(res, error);
  }
};

const getHolidayService = async (req, res) => {
  try {
    const holiday = await req.context.models.Holiday.findByPk(
      req.params.holidayId,
    );

    if (holiday) send(200, res, { holiday });
  } catch (error) {
    console.log(error);
    handleError(res, error);
  }
};

const updateHolidayService = async (
  {
    context: {
      db: { sequelize },
    },
    body,
    params,
  },
  res,
) => {
  try {
    const response = await sequelize.transaction(async () => {
      const holiday = await sequelize.models.Holiday.findByPk(params.holidayId);
      if (holiday)
        return await sequelize.models.Holiday.update(
          { ...body },
          {
            where: { id: params.holidayId },
          },
        );
      else {
        console.log(res, 'No Holiday Found');
        send(300, res, { message: 'No Holiday Found' });
      }
    });

    if (response && response[0] > 0) send(200, res, { message: 'Success' });
    else send(300, res, { message: 'Nothing was updated' });
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

const newHolidayService = async (
  {
    context: {
      db: {
        sequelize,
        Sequelize: { Op },
      },
    },
    body: { from, until },
    userId,
  },
  res,
) => {
  try {
    const where = {
      [Op.or]: [
        {
          from: {
            [Op.between]: [from, until],
          },
        },
        {
          until: {
            [Op.between]: [from, until],
          },
        },
      ],
    };

    const holiday = await sequelize.transaction(async () => {
      const response = await sequelize.models.Holiday.findAll({ where });

      if (response.length === 2)
        send(500, res, { message: 'Two Staff on Holiday already' });
      else {
        return await sequelize.models.Holiday.create(
          {
            from,
            until,
            userId,
            holidayRequests: [
              {
                type: 'new',
                from,
                userId,
                until,
              },
            ],
          },
          {
            include: [sequelize.models.HolidayRequest],
          },
        );
      }
    });
    if (holiday) send(200, res, holiday);
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

const deleteHolidayService = async (
  {
    context: {
      db: { sequelize },
    },
    params,
  },
  res,
) => {
  try {
    const response = await sequelize.transaction(
      async () =>
        await sequelize.models.Holiday.destroy({
          where: { id: params.holidayId },
        }),
    );

    console.log('[Response]', response);

    if (response > 0) send(200, res, { message: 'Success' });
    else send(300, res, { message: 'Nothing was deleted' });
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};

export {
  allHolidaysService,
  deleteHolidayService,
  getHolidayService,
  newHolidayService,
  updateHolidayService,
};
