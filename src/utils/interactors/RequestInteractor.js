import { Interactor } from './Interactor';

class RequestInteractor extends Interactor {
  constructor() {
    super();
  }

  async deleteExisting(transaction, holidayId) {
    await this.HolidayRequest.destroy({
      transaction,
      where: { holidayId },
    });
  }

  async newUpdate(from, holidayId, until, owner) {
    return await this.sequelize.transaction(async transaction => {
      await this.deleteExisting(transaction, holidayId);

      return await this.HolidayRequest.create(
        {
          holidayId,
          from,
          type: 'update',
          owner,
          until,
        },
        { transaction },
      );
    });
  }

  async newDelete(holidayId, owner) {
    return await this.sequelize.transaction(async transaction => {
      await this.deleteExisting(transaction, holidayId);

      return await this.HolidayRequest.create(
        {
          holidayId,
          type: 'delete',
          owner,
        },
        { transaction },
      );
    });
  }
}

export { RequestInteractor };
