import { NotFound } from '../utils/errors';

const ROLES = ['user', 'admin'];

const checkDuplicateUsernameOrEmail = async (
  { body: { email, username }, userInteractor },
  res,
  next,
) => {
  await Promise.all([
    userInteractor.checkUsernameExists(username),
    userInteractor.checkEmailExists(email),
  ])
    .then(() => next())
    .catch(error => next(error));
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
