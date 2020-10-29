import { Interactor } from './Interactor';

class RequestInteractor extends Interactor {
  constructor() {
    super();
  }

  async newUpdate(from, holidayId, until, owner) {
    return await this.sequelize.transaction(
      async transaction =>
        await this.HolidayRequest.create(
          {
            holidayId,
            from,
            type: 'update',
            until,
            owner,
          },
          { transaction },
        ),
    );
  }

  async newDelete(holidayId, owner) {
    return await this.sequelize.transaction(
      async transaction =>
        await this.HolidayRequest.create(
          {
            holidayId,
            type: 'delete',
            owner,
          },
          { transaction },
        ),
    );
  }
}

export { RequestInteractor };
