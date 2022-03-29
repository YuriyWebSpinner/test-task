const errorHandler = require('./error');
const error404Handler = require('./error404');
const auth = require('./auth');
const validator = require('./validator');


module.exports = {
  errorHandler,
  error404Handler,
  auth,
  validator
}
