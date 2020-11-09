import { verify } from 'jsonwebtoken';
import { Forbidden, Unauthorized } from '../utils/errors';

const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token) throw new Forbidden('No token provided');

  verify(token, process.env.MY_SECRET, (err, decoded) => {
    if (err) throw new Unauthorized('Unauthorized');

    req.userId = decoded.id;
  });

  next();
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
      throw new Unauthorized('Only owners can request changes');

    next();
  } catch (error) {
    next(error);
  }
};
const isQueryOwner = async ({ query, userId }, _, next) => {
  try {
    if (query.userId) {
      if (query.userId != userId)
        throw new Unauthorized('Only owners can request their data');
      else next();
    } else next();
  } catch (error) {
    next(error);
  }
};

export { verifyToken, isAdmin, isQueryOwner, isOwner };
