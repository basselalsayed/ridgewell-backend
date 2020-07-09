import { send, holidayExists, noHoliday, handleRequest } from './helpers';

const getAllRequests = async (req, res) =>
  send(200, res, {
    requests: await req.context.models.HolidayRequest.findAll({
      where: { resolved: false },
    }),
  });

const newUpdateRequest = async (req, res) =>
  (await holidayExists(req))
    ? send(200, res, {
        request: await req.context.models.HolidayRequest.create({
          holidayId: req.params.holidayId,
          type: 'update',
          from: req.body.from,
          until: req.body.until,
          userId: req.userId,
        }),
      })
    : noHoliday(res);

const newDeleteRequest = async (req, res) =>
  (await holidayExists(req))
    ? send(200, res, {
        request: await req.context.models.HolidayRequest.create({
          holidayId: req.params.holidayId,
          type: 'delete',
          userId: req.userId,
        }),
      })
    : noHoliday(res);

export { getAllRequests, newUpdateRequest, newDeleteRequest };
