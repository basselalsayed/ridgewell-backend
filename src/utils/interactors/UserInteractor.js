import { Interactor } from './Interactor';
import { verifyRole } from '../../controllers/helpers';
import { Conflict } from '../errors';

class UserInteractor extends Interactor {
  constructor() {
    super();
  }

  async checkUsernameExists(username) {
    return await this.User.findOne({
      where: {
        username,
      },
    }).then(user => {
      if (user) throw new Conflict('Failed. Username already in use.');
    });
  }

  async getUser({ username, email }) {
    const login = username || email;

    return await this.sequelize.transaction(async () =>
      this.User.findByLogin(login),
    );
  }

  async newUser({ username, email, password, roles }) {
    return await this.sequelize.transaction(async () => {
      const user = await this.User.create({
        username,
        email,
        password,
      });

      await verifyRole(user, roles);

      return await this.getUser({ username });
    });
  }
}
export { UserInteractor };
