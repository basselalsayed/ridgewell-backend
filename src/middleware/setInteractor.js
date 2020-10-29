import { HolidayInteractor, UserInteractor } from '../utils/interactors';

const includes = (req, path) => req.path.includes(path);

const setInteractor = async (req, res, next) => {
  if (includes(req, 'session') || includes(req, 'users'))
    req.userInteractor = new UserInteractor();
  if (includes(req, 'holidays'))
    req.holidayInteractor = new HolidayInteractor();

  next();
};

export { setInteractor };
