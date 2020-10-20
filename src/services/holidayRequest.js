import { send, handleError } from '../controllers/helpers';
import { updateHolidayService } from './holiday';

const confirmHolidayRequest = async (
  {
    context: {
      db: { sequelize },
    },
    params,
  },
  res,
) => {
  console.log('[params]', params);
  try {
    const response = sequelize.transaction(async () => {
      const request = await sequelize.models.HolidayRequest.findByPk(
        params.requestId,
      );

      const { from, holidayId, type, until } = request;

      if (type === 'update') {
        updateHolidayService(
          {
            context: { db: { sequelize } },
            body: { from, until },
            params: { holidayId },
          },
          res,
        );
        console.log('[request]', request);
      }
    });
    console.log('[response]', response);
  } catch (error) {
    console.info(error);
    handleError(res, error);
  }
};

export { confirmHolidayRequest };
