export * from './signUp';
export * from './signIn';

const handleError = (res, err) =>
  res.status(500).send({ message: err.message });

export { handleError };
