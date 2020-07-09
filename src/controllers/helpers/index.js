export * from './signUp';
export * from './signIn';

const handleError = (res, err) =>
  res.status(500).send({ message: err.message });

const send200 = (res, object) => {
  res.status(200).send(object);
};
const send500 = (res, message) => {
  res.status(200).send({ message });
};

export { handleError, send200, send500 };
