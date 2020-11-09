import { Conflict, NotUpdated } from '../errors';
import { Interactor } from './Interactor';

class NotificationInteractor extends Interactor {
  constructor() {
    super();
  }

  async getOne(id) {
    return await this.sequelize.transaction(
      async transaction =>
        await this.Notification.findByPk(id, { transaction }),
    );
  }

  async getAll(userId) {
    return await this.sequelize.transaction(
      async transaction =>
        await this.Notification.findAll({
          where: { userId },
          attributes: {
            exclude: ['userId'],
          },
          transaction,
        }),
    );
  }

  async update(read, id) {
    return await this.sequelize.transaction(async transaction => {
      const response = await this.Holiday.update(
        { read },
        {
          transaction,
          where: { id },
        },
      );

      if (response && response[0] > 0) return response;
      else throw new NotUpdated('Nothing was updated');
    });
  }
}

export { NotificationInteractor };
