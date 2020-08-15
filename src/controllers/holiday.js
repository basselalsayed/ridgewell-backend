import { handleError, send } from './helpers';

import {
  allHolidaysService,
  getHolidayService,
  updateHolidayService,
  newHolidayService,
} from '../services/holiday';

const getAll = async (req, res) => await allHolidaysService(req, res);

const getOne = async (req, res) => await getHolidayService(req, res);

const updateHoliday = async (req, res) => await updateHolidayService(req, res);

const newHoliday = async (req, res) => await newHolidayService(req, res);

const deleteHoliday = async (req, res) =>
  await req.context.models.Holiday.destroy({
    where: { id: req.params.holidayId },
  })
    .then(holiday =>
      holiday
        ? send(200, res, { message: 'Holiday Deleted' })
        : send(500, res, { message: 'Holiday Not Found' }),
    )
    .catch(err => handleError(err));

export { deleteHoliday, getAll, getOne, newHoliday, updateHoliday };
