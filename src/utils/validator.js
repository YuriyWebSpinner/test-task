const { oneOf, body } = require("express-validator");

const validateLoginDetails = [
    oneOf([body('id').isEmail(), body('id').isMobilePhone('any')]),
    body('password').isLength({ min: 6, max: 9 }),
];

module.exports = {
    validateLoginDetails
}