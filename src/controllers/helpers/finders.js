const holidayExists = req =>
  req.context.models.Holiday.findByPk(req.params.holidayId);

export { holidayExists };
