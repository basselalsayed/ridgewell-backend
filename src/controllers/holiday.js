import {
  updateHolidayService,
  newHolidayService,
  deleteHolidayService,
} from '../services/holiday';
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

const updateHoliday = async (req, res) => await updateHolidayService(req, res);

const newHoliday = async (req, res) => await newHolidayService(req, res);

const deleteHoliday = async (req, res) => await deleteHolidayService(req, res);

export { deleteHoliday, getAll, getOne, newHoliday, updateHoliday };
