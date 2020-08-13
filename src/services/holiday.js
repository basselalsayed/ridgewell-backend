import { send, handleError } from '../controllers/helpers';

const allHolidaysService = async (req, res) => {
  try {
    const holidays = await req.context.models.Holiday.findAll({
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
    });

    send(200, res, { holidays });
  } catch (error) {
    handleError(res, error);
  }
};

export { allHolidaysService };
