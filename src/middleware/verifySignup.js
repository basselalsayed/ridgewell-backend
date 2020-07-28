import db from '../../database/models';

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

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    const roles = req.body.roles;
    roles.forEach(role => {
      if (!ROLES.includes(role)) {
        res.status(400).send({
          message: 'Failed! Role does not exist = ' + role,
        });
        return;
      }
    });
  }

  next();
};

export { checkDuplicateUsernameOrEmail, checkRolesExisted };
