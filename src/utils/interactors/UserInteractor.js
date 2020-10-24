import { Interactor } from './Interactor';
import { verifyRole } from '../../controllers/helpers';

class UserInteractor extends Interactor {
  constructor() {
    super();
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
