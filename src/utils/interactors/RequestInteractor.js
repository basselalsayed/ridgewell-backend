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

  async confirmRequest(id, userId) {
    return await this.sequelize.transaction(async transaction => {
      const request = await this.HolidayRequest.findByPk(id, { transaction });

      const { from, holidayId, type, until } = request;

      if (type === 'update') {
        await this.Holiday.update(
          { from, until, confirmed: true },
          {
            transaction,
            where: { id: holidayId },
          },
        );

        await request.setManagerId(userId, { transaction });

        return await request.update({ resolved: true }, { transaction });
      }

      if (type === 'delete') {
        await this.Holiday.destroy({
          transaction,
          where: { id },
        });

        await this.deleteExisting(transaction, id);
      }
    });
  }
}

export { RequestInteractor };
