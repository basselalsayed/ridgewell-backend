const getAll = async (req, res) =>
  res.send({ holidays: await req.context.models.Holiday.findAll() });

export { getAll };
