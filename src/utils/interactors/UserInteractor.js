import { Interactor } from './Interactor';

class UserInteractor extends Interactor {
  constructor() {
    super();
  }

  async getUser({ username, email }) {
    const login = username || email;

    return await this.User.findByLogin(login);
  }
}
export { UserInteractor };
