import {
  handleError,
  handleRole,
  validPass,
  invalidPass,
  noUser,
} from '../controllers/helpers';
import { hashSync, compareSync } from 'bcryptjs';

const signInService = async (req, res) => {
  const {
    body: { username, email, password },
    context: {
      models: { User },
    },
  } = req;

  const login = username || email;

  // console.log('compareSync', compareSync);

  await User.findByLogin(login)
    .then(async user => {
      // console.log('[user]', user);

      return user
        ? compareSync(password, user.password)
          ? await validPass(res, user)
          : invalidPass(res)
        : await noUser(res);
    })
    .catch(async err => await handleError(res, err));
};

const signUpService = async (req, res) => {
  const {
    body: { username, email, password, roles },
    context: {
      models: { User },
    },
  } = req;

  await User.create({
    username: username,
    email: email,
    password: hashSync(password, 8),
  })
    .then(async user => {
      await handleRole(user, roles);
      validPass(res, user);
    })
    .catch(error => handleError(res, error));
};

export { signInService, signUpService };
