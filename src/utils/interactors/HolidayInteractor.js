import { Conflict, NotUpdated } from '../errors';
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
              include: [
                {
                  model: this.User,
                  attributes: ['username', 'email'],
                },
                {
                  model: this.User,
                  as: 'managerId',
                  attributes: ['id', 'username', 'email'],
                },
              ],
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

  async newHoliday(from, until, userId) {
    const { Op } = this.Sequelize;

    const where = {
      [Op.or]: [
        {
          from: {
            [Op.between]: [from, until],
          },
        },
        {
          until: {
            [Op.between]: [from, until],
          },
        },
      ],
    };

    return await this.sequelize.transaction(async transaction => {
      const response = await this.Holiday.findAll({ transaction, where });

      if (response.length === 2)
        throw new Conflict('Two Staff on Holiday already');

      return await this.Holiday.create(
        {
          from,
          until,
          userId,
          HolidayRequests: [
            {
              type: 'new',
              from,
              owner: userId,
              until,
            },
          ],
        },
        {
          include: [this.HolidayRequest],
          transaction,
        },
      );
    });
  }

  async deleteHoliday(id) {
    return await this.sequelize.transaction(async transaction => {
      const response = await this.Holiday.destroy({
        transaction,
        where: { id },
      });

      if (response < 1) throw new NotUpdated('Nothing was deleted');
    });
  }
}

export { HolidayInteractor };
