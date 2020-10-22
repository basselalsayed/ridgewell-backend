import { Interactor } from './Interactor';

class UserInteractor extends Interactor {
  constructor() {
    super();
  }

  async getRoles() {}

  async getUser({ username, email }) {
    const login = username || email;

    return await this.User.findByLogin(login);
  }
}
export { UserInteractor };
