import {
  getHolidayService,
  updateHolidayService,
  newHolidayService,
  deleteHolidayService,
} from '../services/holiday';
import { send } from './helpers';

const getAll = async (req, res, next) => {
  try {
    const holidays = await req.holidayInteractor.getAll();

    if (holidays) send(200, res, { holidays });
    next();
  } catch (error) {
    next(error);
  }
};

const getOne = async (req, res, next) =>
  await getHolidayService(req, res, next);

const updateHoliday = async (req, res) => await updateHolidayService(req, res);

const newHoliday = async (req, res) => await newHolidayService(req, res);

const deleteHoliday = async (req, res) => await deleteHolidayService(req, res);

export { deleteHoliday, getAll, getOne, newHoliday, updateHoliday };
