import { HolidayInteractor, UserInteractor } from '../utils/interactors';

const setInteractor = async (req, res, next) => {
  if (req.path === '/session' || req.path === '/users')
    req.userInteractor = new UserInteractor();
  if (req.path === '/holidays') req.holidayInteractor = new HolidayInteractor();

  next();
};

export { setInteractor };
