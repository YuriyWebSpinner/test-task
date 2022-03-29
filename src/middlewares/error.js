const ApiError = require('../exceptions/api-error');
const rc = require('../utils/response-creator');

module.exports = (err, req, res, next) => {

  const { fail } = rc(res);
  console.log(err);

  if (err instanceof ApiError) return res.status(err.status).json({message: err.message, errors: err.errors});

  return fail();
}
