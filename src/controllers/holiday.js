import {
  allHolidaysService,
  getHolidayService,
  updateHolidayService,
  newHolidayService,
  deleteHolidayService,
} from '../services/holiday';

const getAll = async (req, res) => await allHolidaysService(req, res);

const getOne = async (req, res) => await getHolidayService(req, res);

const updateHoliday = async (req, res) => await updateHolidayService(req, res);

const newHoliday = async (req, res) => await newHolidayService(req, res);

const deleteHoliday = async (req, res) => await deleteHolidayService(req, res);

export { deleteHoliday, getAll, getOne, newHoliday, updateHoliday };
