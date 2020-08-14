import { signInService, signUpService } from '../services/auth';

const signUp = async (req, res) => {
  await signUpService(req, res);
};

const signIn = async (req, res) => {
  await signInService(req, res);
};

export { signIn, signUp };
