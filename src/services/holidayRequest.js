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

      if (request.type === 'update') {
        updateHolidayService(
          {
            context: { db: { sequelize } },
            body: { from: request.from, until: request.until },
            params: { holidayId: request.holidayId },
          },
          res,
        );
        console.log('[request]', request);
      }
    });
    console.log('[response]', response);
  } catch (error) {}
};

export { confirmHolidayRequest };
