import { Interactor } from './Interactor';

class RequestInteractor extends Interactor {
  constructor() {
    super();
  }

  async newUpdate(from, holidayId, until, owner) {
    return await this.sequelize.transaction(async transaction => {
      return await this.HolidayRequest.create(
        {
          holidayId,
          from,
          type: 'update',
          until,
          owner,
        },
        { transaction },
      );
    });
  }
}

export { RequestInteractor };
