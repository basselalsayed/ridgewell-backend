import { verify } from 'jsonwebtoken';

import models from '../models';

const { User } = models;

const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];

  !token &&
    res.status(403).send({
      message: 'No token provided!',
    });

  verify(token, process.env.MY_SECRET, (err, decoded) => {
    err &&
      res.status(401).send({
        message: 'Unauthorized!',
      });

    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user =>
    user
      .getRoles()
      .then(roles => {
        roles.forEach(role =>
          role.name === 'admin'
            ? next()
            : res.status(403).send({
                message: 'Require Admin Role!',
              }),
        );
      })
      .catch(err =>
        res.status(403).send({
          message: err.message,
        }),
      ),
  );
};

const isOwner = (req, res, next) => {
  req.params.holidayId == req.userId
    ? next()
    : res.status(403).send('Require Owner or Admin Role');
};

export { verifyToken, isAdmin, isOwner };
