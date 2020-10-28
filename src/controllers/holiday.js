import { newHolidayService, deleteHolidayService } from '../services/holiday';
import { NotFound } from '../utils/errors';
import { send } from './helpers';

const getAll = async ({ holidayInteractor }, res, next) => {
  try {
    const holidays = await holidayInteractor.getAll();

    if (holidays) send(200, res, holidays);
    next();
  } catch (error) {
    next(error);
  }
};

const getOne = async (
  { holidayInteractor, params: { holidayId } },
  res,
  next,
) => {
  try {
    const holiday = await holidayInteractor.getOne(holidayId);

    if (!holiday) throw new NotFound('No Holiday Found');
    send(200, res, holiday);
    next();
  } catch (error) {
    next(error);
  }
};

const updateHoliday = async (
  { body, holidayInteractor, params: { holidayId } },
  res,
  next,
) => {
  try {
    await holidayInteractor.update(body, holidayId);

    send(200, res, { message: 'Success' });
  } catch (error) {
    next(error);
  }
};

const newHoliday = async (
  { body: { from, until }, holidayInteractor, userId },
  res,
  next,
) => {
  try {
    const holiday = await holidayInteractor.newHoliday(from, until, userId);

    send(200, res, { message: 'success', holiday });
  } catch (error) {
    next(error);
  }
};

const deleteHoliday = async (req, res) => await deleteHolidayService(req, res);

export { deleteHoliday, getAll, getOne, newHoliday, updateHoliday };
