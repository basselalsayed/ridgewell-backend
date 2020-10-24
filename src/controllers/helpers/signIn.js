import { send } from '.';

const noUser = res => send(404, res, { message: 'User not found.' });

const invalidPass = res =>
  send(401, res, {
    accessToken: null,
    message: 'Invalid Password!',
  });

const validPass = (res, user) => {
  let accessToken = getAccessToken(user.id);

  let roles = [];

  user
    .getRoles()
    .then(dbRoles => {
      dbRoles.forEach(role => roles.push(`ROLE_${role.name.toUpperCase()}`));
      return {
        message: 'Success!',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          roles,
          accessToken,
        },
      };
    })
    .then(obj => send(200, res, obj));
};

export { invalidPass, noUser, validPass };
