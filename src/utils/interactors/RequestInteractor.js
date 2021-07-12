import { red } from 'chalk';
import { formatted } from '../../helpers/date';
import { Interactor } from './Interactor';

class RequestInteractor extends Interactor {
  constructor() {
    super();
  }

  getAll = async owner => {
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
  };

  _deleteExisting = async (transaction, holidayId) =>
    await this.HolidayRequest.destroy({
      transaction,
      where: { holidayId },
    });

  newUpdate = async ({ from, holidayId, until, owner }) =>
    await this.sequelize.transaction(async transaction => {
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

  newDelete = async (holidayId, owner) =>
    await this.sequelize.transaction(async transaction => {
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

  _sendNotification = async (requestId, userId, message, transaction) =>
    await this.Notification.create(
      {
        requestId,
        userId,
        message,
      },
      { transaction },
    );
  _handleUpdate = async ({
    request,
    request: { id, from, Holiday, until, owner },
    transaction,
    userId,
  }) => {
    await Holiday.update(
      { from, until, confirmed: 'TRUE' },
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

    // await request.destroy({ transaction });

    return await request.update({ resolved: true }, { transaction });
  };

  _handleNew = async ({
    request,
    request: {
      id,
      Holiday,
      Holiday: { from, until },
      owner,
    },
    transaction,
    userId,
  }) => {
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
      `Your holiday from: ${formatted(from, 'panel')} to: ${formatted(
        until,
        'panel',
      )} was approved.`,
      transaction,
    );

    await request.destroy({ transaction });
    await request.update({ resolved: true }, { transaction });
  };

  _handleDelete = async ({
    request,
    request: {
      Holiday,
      Holiday: { from, until },
      id,
      owner,
    },
    transaction,
    userId,
  }) => {
    await Holiday.destroy({
      transaction,
    });

    await this._sendNotification(
      id,
      owner,
      `Your request to cancel your holiday from: ${formatted(
        from,
        'panel',
      )} until: ${formatted(until, 'panel')} was approved.`,
      transaction,
    );

    await request.setManagerId(userId, { transaction });

    await this._deleteExisting(transaction, id);
  };

  confirmRequest = async (id, userId) => {
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
  };

  denyRequest = async (id, userId) =>
    await this.sequelize.transaction(async transaction => {
      const request = await this.HolidayRequest.findByPk(id, { transaction });

      await request.setManagerId(userId, { transaction });

      await this._sendNotification(
        id,
        request.owner,
        `Your holiday request was denied.`,
        transaction,
      );
      return await request.update({ resolved: true }, { transaction });
    });
}

export { RequestInteractor };
