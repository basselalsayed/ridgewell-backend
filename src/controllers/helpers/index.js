export * from './requests';
export * from './signUp';
export * from './signIn';

import { sign } from 'jsonwebtoken';

const getAccessToken = id =>
  sign({ id }, process.env.MY_SECRET, {
    expiresIn: 86400, // 24 hours
  });

const buildUserObjectResponse = ({
  email,
  id,
  Roles,
  username,
  Notifications,
}) => {
  let accessToken = getAccessToken(id);

  let roles = Roles.map(role => `ROLE_${role.name.toUpperCase()}`);

  return {
    message: 'Success',
    user: {
      id,
      username,
      email,
      roles,
      accessToken,
      Notifications,
    },
  };
};

const send = (code, res, object) => {
  res.status(code).send(object);
};

export { buildUserObjectResponse, getAccessToken, send };
