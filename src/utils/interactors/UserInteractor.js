import { Interactor } from './Interactor';
import { Conflict, NotFound } from '../errors';

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
              username,
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
              email,
            },
          },
          { transaction },
        ).then(user => {
          if (user) throw new Conflict('Failed. Email already in use.');
        }),
    );
  }

  async getUser({ username, email }) {
    const login = username || email;

    return await this.User.findByLogin(login);
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
