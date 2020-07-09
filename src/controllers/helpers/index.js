export * from './finders';
export * from './signUp';
export * from './signIn';

const send = (code, res, object) => {
  res.status(code).send(object);
};

const handleError = (res, err) => send(500, res, { message: err.message });

export { handleError, send };
