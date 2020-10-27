import { Interactor } from './Interactor';

class HolidayInteractor extends Interactor {
  constructor() {
    super();
  }

  async getAll() {
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
