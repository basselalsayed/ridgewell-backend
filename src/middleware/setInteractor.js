import { UserInteractor } from '../utils/interactors';

const setInteractor = async (req, res, next) => {
  if (req.path === '/session' || req.path === '/users')
    req.userInteractor = new UserInteractor();

  next();
};

export { setInteractor };
