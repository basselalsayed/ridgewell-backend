import db from '../../../database/models';

import { send } from '.';

const {
  sequelize: {
    models: { Role },
  },
  Sequelize: { Op },
} = db;

const registerSuccess = res =>
  send(200, res, { message: 'User was registered successfully!' });

const verifyRole = async (user, roles) =>
  await Role.findAll({
    where: {
      name: {
        [Op.or]: roles,
      },
    },
  }).then(roles => setRoles(user, roles));

const setRoles = async (user, role) => await user.setRoles(role);

const handleRole = (user, roles) =>
  roles ? verifyRole(user, roles) : setRoles(user, []);

export { verifyRole, handleRole, registerSuccess };
