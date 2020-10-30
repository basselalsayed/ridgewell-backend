import { send } from './helpers';

const confirmRequest = async (
  { params: { requestId }, requestInteractor, userId },
  res,
  next,
) => {
  try {
    await requestInteractor.confirmRequest(requestId, userId);

    send(200, res, { message: 'Success' });
  } catch (error) {
    next(error);
  }
};
const denyRequest = async (
  { params: { requestId }, requestInteractor, userId },
  res,
  next,
) => {
  try {
    await requestInteractor.denyRequest(requestId, userId);

    send(200, res, { message: 'Success' });
  } catch (error) {
    next(error);
  }
};
const getAllRequests = async ({ requestInteractor }, res, next) => {
  try {
    const requests = await requestInteractor.getAll();

    send(200, res, requests);
  } catch (error) {
    next(error);
  }
};
const newRequest = async (
  { body: { from, holidayId, type, until }, requestInteractor, userId },
  res,
  next,
) => {
  try {
    const request =
      type === 'update'
        ? await requestInteractor.newUpdate(from, holidayId, until, userId)
        : await requestInteractor.newDelete(holidayId, userId);

    send(200, res, { message: 'Success', request });
  } catch (error) {
    next(error);
  }
};
export { confirmRequest, denyRequest, getAllRequests, newRequest };
