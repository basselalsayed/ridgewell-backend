import {
  HolidayInteractor,
  RequestInteractor,
  UserInteractor,
} from '../utils/interactors';

const setInteractor = async (req, res, next) => {
  req.userInteractor = new UserInteractor();
  req.holidayInteractor = new HolidayInteractor();
  req.requestInteractor = new RequestInteractor();

  next();
};

export { setInteractor };
