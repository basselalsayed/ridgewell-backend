import { send } from '../controllers/helpers';
import { GeneralError } from '../utils/errors';

const handleErrors = (error, req, res, next) => {
  console.log(`\x1b[31m[${new Date(Date.now())}]\n\x1b[0m`);
  console.log('\x1b[31m[Error]\n\x1b[0m', `\x1b[33m${error}\n\x1b[0m`);
  console.log('\x1b[31m[Request URL]\n\x1b[0m', `\x1b[33m${req.url}\n\x1b[0m`);
  console.log(
    '\x1b[31m[Request Method]\n\x1b[0m',
    `\x1b[33m${req.method}\n\x1b[0m`,
  );
  // replace with req.userId
  console.log(
    '\x1b[31m[Request Params]\n\x1b[0m',
    `\x1b[33m${req.params}\n\x1b[0m`,
  );

  res.statusMessage = error.message;

  if (error instanceof GeneralError) return send(error.getCode(), res);

  return send(500, res);
};

export default handleErrors;
