import { sign } from 'jsonwebtoken';
import { send } from '.';

const noUser = res => send(401, res, { message: 'User not found.' });

const invalidPass = res =>
  send(401, res, {
    accessToken: null,
    message: 'Invalid Password!',
  });

const getAccessToken = id =>
  sign({ id }, process.env.MY_SECRET, {
    expiresIn: 86400, // 24 hours
  });

const validPass = (res, user) => {
  let accessToken = getAccessToken(user.id);

  let roles = [];

  user
    .getRoles()
    .then(dbRoles => {
      dbRoles.forEach(role => roles.push(`ROLE_${role.name.toUpperCase()}`));
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        roles,
        accessToken,
      };
    })
    .then(obj => send(200, res, obj));
};

export { invalidPass, noUser, validPass };
