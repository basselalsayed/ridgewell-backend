import { handleError, handleRole, validPass } from '../controllers/helpers';
import { hashSync } from 'bcryptjs';

const signUpService = async (req, res) => {
  const {
    body: { username, email, password, roles },
    context: {
      models: { User },
    },
  } = req;

  User.create({
    username: username,
    email: email,
    password: hashSync(password, 8),
  })
    .then(async user => {
      await handleRole(user, roles);
      validPass(res, user);
    })
    .catch(error => handleError(res, error));
};

export { signUpService };
