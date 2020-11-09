import { Interactor } from './Interactor';

class RequestInteractor extends Interactor {
  constructor() {
    super();
  }

  async getAll(owner) {
    const where = owner ? { owner } : {};
    return await this.sequelize.transaction(
      async transaction =>
        await this.HolidayRequest.findAll({
          // where: { resolved: false },
          where,
          attributes: {
            exclude: ['owner'],
          },
          include: [
            {
              model: this.Holiday,

              attributes: ['id', 'from', 'until'],
            },
            {
              model: this.User,
              attributes: ['id', 'username', 'email'],
            },
            {
              model: this.User,
              as: 'managerId',
              attributes: ['id', 'username', 'email'],
            },
          ],
          transaction,
        }),
    );
  }

  async _deleteExisting(transaction, holidayId) {
    await this.HolidayRequest.destroy({
      transaction,
      where: { holidayId },
    });
  }

  async newUpdate(from, holidayId, until, owner) {
    return await this.sequelize.transaction(async transaction => {
      await this._deleteExisting(transaction, holidayId);

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
      await this._deleteExisting(transaction, holidayId);

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

  async _sendNotification(requestId, userId, message, transaction) {
    await this.Notification.create(
      {
        requestId,
        userId,
        message,
      },
      { transaction },
    );
  }

  async _handleUpdate({
    request,
    request: { id, from, Holiday, until, owner },
    transaction,
    userId,
  }) {
    await Holiday.update(
      { from, until, confirmed: true },
      {
        transaction,
      },
    );

    await request.setManagerId(userId, { transaction });

    await this._sendNotification(
      id,
      owner,
      'Your request to update your holiday was approved.',
      transaction,
    );

    return await request.update({ resolved: true }, { transaction });
  }

  async _handleNew({
    request,
    request: {
      id,
      Holiday,
      Holiday: { from, until },
      owner,
    },
    transaction,
    userId,
  }) {
    await Holiday.update(
      { confirmed: true },
      {
        transaction,
      },
    );

    await request.setManagerId(userId, { transaction });

    await this._sendNotification(
      id,
      owner,
      `Your holiday from: ${from} to: ${until} was approved.`,
      transaction,
    );

    return await request.update({ resolved: true }, { transaction });
  }

  async _handleDelete({
    request,
    request: {
      Holiday,
      Holiday: { from, until },
      id,
      owner,
    },
    transaction,
    userId,
  }) {
    await Holiday.destroy({
      transaction,
    });

    await this._sendNotification(
      id,
      owner,
      `Your request to cancel your holiday from: ${from} until: ${until} was approved.`,
      transaction,
    );

    await request.setManagerId(userId, { transaction });

    await this._deleteExisting(transaction, id);
  }
  async confirmRequest(id, userId) {
    return await this.sequelize.transaction(async transaction => {
      const request = await this.HolidayRequest.findByPk(id, {
        include: {
          association: 'Holiday',
          attributes: ['id', 'from', 'until'],
        },
        transaction,
      });

      const { type } = request;

      if (type === 'update') {
        await this._handleUpdate({ request, userId, transaction });
      }
      if (type === 'new') {
        await this._handleNew({ request, userId, transaction });
      }
      if (type === 'delete') {
        await this._handleDelete({ request, userId, transaction });
      }
    });
  }

  async denyRequest(id, userId) {
    return await this.sequelize.transaction(async transaction => {
      const request = await this.HolidayRequest.findByPk(id, { transaction });

      await request.setManagerId(userId, { transaction });

      return await request.update({ resolved: true }, { transaction });
    });
  }
}

export { RequestInteractor };
