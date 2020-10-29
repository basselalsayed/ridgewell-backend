import { verify } from 'jsonwebtoken';
import { Unauthorized } from '../utils/errors';

const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];

  !token &&
    res.status(403).send({
      message: 'No token provided!',
    });

  verify(token, process.env.MY_SECRET, (err, decoded) => {
    err &&
      res.status(401).send({
        message: 'Unauthorized!',
      });

    req.userId = decoded.id;
    next();
  });
};

const isAdmin = async ({ userInteractor, userId }, res, next) => {
  try {
    const user = await userInteractor.getOneById(userId);

    user.Roles.forEach(role => {
      if (role.name !== 'admin') throw new Unauthorized('Require Admin Role');

      next();
    });
  } catch (error) {
    next(error);
  }
};

const isOwner = async (
  { body: { holidayId }, holidayInteractor, userId },
  res,
  next,
) => {
  try {
    const holiday = await holidayInteractor.getOne(holidayId);

    if (holiday.userId !== userId)
      throw new Unauthorized('Require Owner or Admin Role');

    next();
  } catch (error) {
    next(error);
  }
};

export { verifyToken, isAdmin, isOwner };
