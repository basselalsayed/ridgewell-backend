import { red, yellow } from 'chalk';
import { send } from '../controllers/helpers';
import { GeneralError } from '../utils/errors';

const handleErrors = (error, { method, params, url }, res, next) => {
  console.log(red(new Date(Date.now())));
  console.log(red('[Error]:'), yellow(error));
  console.log(red('[Request URL]:'), yellow(url));
  console.log(red('[Request Method]:'), yellow(method));
  console.log(red('[Request Params]:'), yellow(params));
  console.log(yellow(error.stack));

  res.statusMessage = error.message;

  if (error instanceof GeneralError) return send(error.getCode(), res);

  return send(500, res);
};

export default handleErrors;
