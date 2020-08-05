import db from '../../database/models';

import { handleError, invalidPass, noUser, validPass } from './helpers';
import { compareSync } from 'bcryptjs';
import { signUpService } from '../services/auth';

const { User } = db.sequelize.models;

const signUp = async (req, res) => {
  // Save User to Database

  await signUpService(req, res);
};

const signIn = (req, res) => {
  const { username, email, password } = req.body;
  const login = username || email;

  User.findByLogin(login)
    .then(user =>
      user
        ? compareSync(password, user.password)
          ? validPass(res, user)
          : invalidPass(res)
        : noUser(res),
    )
    .catch(err => handleError(res, err));
};

export { signIn, signUp };
