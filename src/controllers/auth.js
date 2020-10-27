import { UserInteractor } from '../utils/interactors';
import { compareSync } from 'bcryptjs';
import { Unauthorized } from '../utils/errors';
import { buildUserObjectResponse, send } from './helpers';

const signUp = async (req, res, next) => {
  const {
    body: { username, email, roles = ['user'], password },
    userInteractor,
  } = req;

  try {
    const user = await userInteractor.newUser({
      username,
      email,
      roles,
      password,
    });

    send(200, res, buildUserObjectResponse(user));
    next();
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  const {
    body: { username, email, password },
    userInteractor,
  } = req;

  try {
    const user = await userInteractor.getUser({ username, email });

    if (compareSync(password, user.password)) {
      send(200, res, buildUserObjectResponse(user));
      next();
    } else throw new Unauthorized('Invalid Password');
  } catch (error) {
    next(error);
  }
};

export { signIn, signUp };
