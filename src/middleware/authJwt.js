import { verify } from 'jsonwebtoken';

import models from '../models';

const { User } = models;

const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token)
    return res.status(403).send({
      message: 'No token provided!',
    });

  verify(token, process.env.MY_SECRET, (err, decoded) => {
    if (err)
      return res.status(401).send({
        message: 'Unauthorized!',
      });

    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user
      .getRoles()
      .then(roles => {
        roles.forEach(role => {
          if (role.name === 'admin') {
            next();
            return;
          }
        });

        res.status(403).send({
          message: 'Require Admin Role!',
        });
        return;
      })
      .catch(err =>
        res.status(403).send({
          message: err.message,
        }),
      );
  });
};

export { verifyToken, isAdmin };
