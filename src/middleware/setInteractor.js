import {
  HolidayInteractor,
  RequestInteractor,
  NotificationInteractor,
  UserInteractor,
} from '../utils/interactors';

const setInteractor = async (req, res, next) => {
  req.userInteractor = new UserInteractor();
  req.holidayInteractor = new HolidayInteractor();
  req.requestInteractor = new RequestInteractor();
  req.notificationInteractor = new NotificationInteractor();
  next();
};

export { setInteractor };
