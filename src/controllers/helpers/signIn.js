import { sign } from 'jsonwebtoken';

const noUser = res => res.status(404).send({ message: 'User not found.' });

const invalidPass = res =>
  res.status(401).send({
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
    .then(obj => sendRes(res, obj));
};

const sendRes = (res, obj) => res.status(200).send(obj);

export { invalidPass, noUser, validPass };