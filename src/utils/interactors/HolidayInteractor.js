import Holiday from '../../../database/models/Holiday';
import { Interactor } from './Interactor';

class HolidayInteractor extends Interactor {
  constructor() {
    super();
  }

  async getAllHolidays() {
    return await this.sequelize.transaction(
      async () =>
        await this.Holiday.findAll({
          include: [
            {
              model: this.HolidayRequest,
              attributes: ['id', 'type', 'from', 'until', 'resolved'],
            },
            {
              model: this.User,
              attributes: ['username', 'email'],
            },
          ],
        }),
    );
  }
}

export { HolidayInteractor };

let holidayInteractor = new HolidayInteractor();

(async function () {
  const holiday = await holidayInteractor.getAllHolidays();
  console.log(holiday);
})();
