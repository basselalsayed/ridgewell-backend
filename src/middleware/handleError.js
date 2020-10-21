import { GeneralError } from '../utils/errors';

const handleErrors = (error, req, res, next) => {
  console.log('[Request URL]', req.url);
  console.log('[Request Method', req.method);
  console.log('[Request Params', req.params);
  console.log('[Error]', error);

  res.statusMessage = error.message;

  if (error instanceof GeneralError) return res.status(error.getCode()).send();
  else return res.status(500).send();
};

export default handleErrors;
