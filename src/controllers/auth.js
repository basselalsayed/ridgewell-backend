import models, { sequelize } from '../models';
import { Sequelize } from 'sequelize';

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const Op = Sequelize.Op;
const User = models.User;
const Role = models.Role;

const signUp = (req, res) => {
  // Save User to Database
  const { username, email, password, roles } = req.body;
  User.create({
    username: username,
    email: email,
    password: bcrypt.hashSync(password, 8),
  })
    .then(user => {
      roles
        ? Role.findAll({
            where: {
              name: {
                [Op.or]: roles,
              },
            },
          }).then(roles => {
            user.setRoles(roles).then(() => {
              res.send({ message: 'User was registered successfully!' });
            });
          })
        : // user role = 1
          user.setRoles([1]).then(() => {
            res.send({ message: 'User was registered successfully!' });
          });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

const signIn = (req, res) => {
  const login = req.body.username || req.body.email;
  // User.findOne({
  //   where: {
  //     [Op.or]: [{ username: login }, { email: login }],
  //   },
  // })
  User.findByLogin(login)
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'User Not found.' });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password,
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!',
        });
      }

      var token = jwt.sign({ id: user.id }, process.env.MY_SECRET, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push('ROLE_' + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

export { signIn, signUp };
