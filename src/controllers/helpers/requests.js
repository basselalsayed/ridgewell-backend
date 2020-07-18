import { send } from '.';

const holidayExists = req =>
  req.context.models.Holiday.findByPk(req.params.holidayId);

const noHoliday = res => send(422, res, { message: 'No Holiday found' });

export { holidayExists, noHoliday };
