import { UserInteractor } from '../utils/interactors';
import { compareSync } from 'bcryptjs';
import { Unauthorized } from '../utils/errors';
import { buildUserObjectResponse, send } from './helpers';

import { signInService, signUpService } from '../services/auth';

const userInteractor = new UserInteractor();

const signUp = async (req, res) => {
  await signUpService(req, res);
};

const signInOld = async (req, res) => {
  await signInService(req, res);
};

const signIn = async (req, res, next) => {
  const {
    body: { username, email, password },
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
