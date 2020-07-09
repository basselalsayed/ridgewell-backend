import { send } from './helpers';

const getAllRequests = async (req, res) =>
  send(200, res, {
    requests: await req.context.models.HolidayRequest.findAll({
      where: { resolved: false },
    }),
  });

const newUpdateRequest = async (req, res) =>
  send(200, res, {
    request: await req.context.models.HolidayRequest.create({
      holidayId: req.params.holidayId,
      type: req.body.type,
      from: req.body.from,
      until: req.body.until,
      userId: req.userId,
    }),
  });

const newDeleteRequest = (req, res) => {};

export { getAllRequests, newUpdateRequest, newDeleteRequest };
