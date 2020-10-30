import { send } from './helpers';

const getAllRequests = async (req, res) =>
  send(200, res, {
    requests: await req.context.models.HolidayRequest.findAll({
      // where: { resolved: false },

      attributes: {
        exclude: ['owner'],
      },
      include: [
        {
          model: req.context.models.User,

          attributes: ['username', 'email'],
        },
        {
          model: req.context.models.User,
          as: 'managerId',
          attributes: ['id', 'username', 'email'],
        },
      ],
    }),
  });

const newRequest = async (
  { body: { from, holidayId, type, until }, requestInteractor, userId },
  res,
  next,
) => {
  try {
    const request =
      type === 'update'
        ? await requestInteractor.newUpdate(from, holidayId, until, userId)
        : await requestInteractor.newDelete(holidayId, userId);

    send(200, res, { message: 'Success', request });
  } catch (error) {
    next(error);
  }
};

export { getAllRequests, newRequest };
