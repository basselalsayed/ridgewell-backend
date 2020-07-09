import models from '../../models';
import { Sequelize } from 'sequelize';
import { send } from '.';

const Op = Sequelize.Op;

const { Role } = models;

const registerSuccess = res =>
  send(200, res, { message: 'User was registered successfully!' });

const hasRole = (user, roles) =>
  Role.findAll({
    where: {
      name: {
        [Op.or]: roles,
      },
    },
  }).then(roles => setRoles(user, roles));

const setRoles = (user, role) => user.setRoles(role);

const handleRole = (user, roles) =>
  roles ? hasRole(user, roles) : setRoles(user, [1]);

export { handleRole, registerSuccess };
