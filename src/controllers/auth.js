import db from '../../database/models';

import {
  handleError,
  handleRole,
  invalidPass,
  noUser,
  registerSuccess,
  validPass,
} from './helpers';
import { hashSync, compareSync } from 'bcryptjs';

const { User } = db.sequelize.models;

const signUp = (req, res) => {
  // Save User to Database
  const { username, email, password, roles } = req.body;
  User.create({
    username: username,
    email: email,
    password: hashSync(password, 8),
  })
    .then(async user => {
      await handleRole(user, roles);
      validPass(res, user);
    })
    .catch(err => handleError(res, err));
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
