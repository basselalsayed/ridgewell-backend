import { send } from './helpers';

const getAllUsers = async ({ userInteractor }, res, next) => {
  try {
    const response = await userInteractor.getAll();
    send(200, res, response);
  } catch (error) {
    next(error);
  }
};

const userBoard = (req, res) => send(200, res, 'User Content.');

const adminBoard = (req, res) => send(200, res, 'Admin Content.');

export { getAllUsers, userBoard, adminBoard };
