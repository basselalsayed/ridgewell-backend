export * from './requests';
export * from './signUp';
export * from './signIn';

const send = (code, res, object) => {
  res.status(code).send(object);
};

const handleError = (res, { code, message }) =>
  send(code || 500, res, { message });
export { handleError, send };
