import chalk from 'chalk';
import { send } from '../controllers/helpers';
import { GeneralError } from '../utils/errors';

const handleErrors = (error, req, res, next) => {
  console.log(chalk.red(new Date(Date.now())));
  console.log(chalk.red('[Error]'), chalk.yellow(error));
  console.log(chalk.red('[Request URL]'), chalk.yellow(req.url));
  console.log(chalk.red('[Request Method]'), chalk.yellow(req.method));
  console.log(chalk.red('[Request Params]'), chalk.yellow(req.params));
  console.log(chalk.yellow(error.stack));

  res.statusMessage = error.message;

  if (error instanceof GeneralError) return send(error.getCode(), res);

  return send(500, res);
};

export default handleErrors;
