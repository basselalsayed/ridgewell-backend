import { send } from './helpers';

const allAccess = async (req, res) =>
  send(
    200,
    res,
    await req.context.models.User.findAll({
      attributes: {
        exclude: ['password'],
      },
    }),
  );

const userBoard = (req, res) => send(200, res, 'User Content.');

const adminBoard = (req, res) => send(200, res, 'Admin Content.');

export { allAccess, userBoard, adminBoard };
