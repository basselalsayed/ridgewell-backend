import { send } from './helpers';

const getAllNotifications = async (
  { notificationInteractor, userId },
  res,
  next,
) => {
  try {
    const notifications = await notificationInteractor.getAll(userId);

    if (notifications) send(200, res, notifications);
    next();
  } catch (error) {
    next(error);
  }
};

const updateNotification = async (
  { body, notificationInteractor, params: { notificationId } },
  res,
  next,
) => {
  try {
    await notificationInteractor.update(body, notificationId);

    send(200, res, { message: 'Success' });
  } catch (error) {
    next(error);
  }
};

export { getAllNotifications, updateNotification };
