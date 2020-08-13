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
    handleError(res, error);
  }
};

export { allHolidaysService, getHolidayService };
