const ApiError = require('../exceptions/api-error');
const { validationResult } = require('express-validator');

module.exports = function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(ApiError.BadRequest('Validation error', errors.array()));
    next();
}