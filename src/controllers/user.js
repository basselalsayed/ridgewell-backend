const allAccess = async (req, res) =>
  res.send(await req.context.models.User.findAll());

const userBoard = (req, res) => res.status(200).send('User Content.');

const adminBoard = (req, res) => res.status(200).send('Admin Content.');

export { allAccess, userBoard, adminBoard };
