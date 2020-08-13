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

    send(200, res, { holidays });
  } catch (error) {
    handleError(res, error);
  }
};

export { allHolidaysService };
