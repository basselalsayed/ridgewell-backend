import { Conflict, NotUpdated } from '../errors';
import { Interactor } from './Interactor';

class HolidayInteractor extends Interactor {
  constructor() {
    super();
  }

  getAll = async userId =>
    await this.sequelize.transaction(
      async transaction =>
        await this.Holiday.findAll({
          where: userId ? { userId } : {},
          attributes: {
            exclude: ['userId'],
          },
          include: [
            {
              model: this.HolidayRequest,
              attributes: ['id', 'type', 'from', 'until', 'resolved'],
              include: [
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
            },
            {
              model: this.User,
              attributes: ['id', 'username', 'email'],
            },
          ],
          transaction,
        }),
    );
  getOne = async id =>
    await this.sequelize.transaction(
      async transaction => await this.Holiday.findByPk(id, { transaction }),
    );

  update = async (content, id) =>
    await this.sequelize.transaction(async transaction => {
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

  newHoliday = async (annualLeave, from, until, userId) => {
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
          annualLeave,
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
  };

  deleteHoliday = async id =>
    await this.sequelize.transaction(async transaction => {
      const response = await this.Holiday.destroy({
        transaction,
        where: { id },
      });

      if (response < 1) throw new NotUpdated('Nothing was deleted');
    });
}

export { HolidayInteractor };
