import { NotUpdated } from '../errors';
import { Interactor } from './Interactor';

class HolidayInteractor extends Interactor {
  constructor() {
    super();
  }

  async getAll() {
    return await this.sequelize.transaction(
      async transaction =>
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
          transaction,
        }),
    );
  }

  async getOne(id) {
    return await this.sequelize.transaction(
      async transaction => await this.Holiday.findByPk(id, { transaction }),
    );
  }
  async update(content, id) {
    return await this.sequelize.transaction(async transaction => {
      const response = await this.Holiday.update(
        { ...content },
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

export { HolidayInteractor };
