import { Interactor } from './Interactor';
import { Conflict, NotFound } from '../errors';
import { encrypt } from '../encryption';

class UserInteractor extends Interactor {
  constructor() {
    super();
  }

  async checkUsernameExists(username) {
    return await this.sequelize.transaction(
      async transaction =>
        await this.User.findOne(
          {
            where: {
              username: encrypt(username),
            },
          },
          { transaction },
        ).then(user => {
          if (user) throw new Conflict('Failed. Username already in use.');
        }),
    );
  }

  async checkEmailExists(email) {
    return await this.sequelize.transaction(
      async transaction =>
        await this.User.findOne(
          {
            where: {
              email: encrypt(email),
            },
          },
          { transaction },
        ).then(user => {
          if (user) throw new Conflict('Failed. Email already in use.');
        }),
    );
  }

  async getAll() {
    return await this.sequelize.transaction(
      async transaction =>
        await this.User.findAll({
          attributes: {
            exclude: ['password'],
          },
          include: [
            {
              model: this.Holiday,
              attributes: ['id', 'from', 'until', 'confirmed'],
            },
            {
              model: this.HolidayRequest,
              attributes: ['id', 'from', 'until', 'resolved'],
            },
          ],
          transaction,
        }),
    );
  }

  async getUser({ username, email }) {
    let login = username || email;

    login = encrypt(login);
    return await this.User.findByLogin(login);
  }

  async getOneById(id) {
    return await this.sequelize.transaction(
      async transaction =>
        await this.User.findByPk(id, {
          include: [
            {
              association: 'Roles',
              attributes: ['name'],
            },
          ],
          transaction,
        }),
    );
  }

  async newUser({ username, email, password, roles }) {
    await this.sequelize.transaction(async transaction => {
      const user = await this.User.create(
        {
          username,
          email,
          password,
        },
        { transaction },
      );

      const dbRoles = await this.Role.findAll({
        where: {
          name: {
            [this.Sequelize.Op.or]: roles,
          },
        },
        transaction,
      });

      if (dbRoles.length < 1)
        throw new NotFound('Role does not exist in database');

      await user.setRoles(dbRoles, { transaction });
    });
    return await this.getUser({ username });
  }
}

export { UserInteractor };
