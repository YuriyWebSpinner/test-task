const rc = require('../utils/response-creator');

module.exports = (req, res) => {
  const { notFound } = rc(res);

  const message = `Page ${req.protocol}://${req.hostname}${req.originalUrl} not found. Method - ${req.method}`;

  return notFound({ message });
}
