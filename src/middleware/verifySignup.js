import db from '../../database/models';
import { NotFound } from '../utils/errors';

const { User } = db.sequelize.models;
const ROLES = ['user', 'admin'];

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: 'Failed! Username is already in use!',
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: 'Failed! Email is already in use!',
        });
        return;
      }

      next();
    });
  });
};

const checkRolesExist = ({ body: { roles } }, res, next) => {
  if (roles) {
    roles.forEach(role => {
      if (!ROLES.includes(role.toLowerCase()))
        throw new NotFound(`Failed. Role '${role}' does not exist.`);
    });
  }

  next();
};

export { checkDuplicateUsernameOrEmail, checkRolesExist };
