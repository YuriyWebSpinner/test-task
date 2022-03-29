const express = require('express');
const fileRouter = express.Router();
const authController = require("../controllers/auth");
const { auth, validator } = require('../middlewares');
const validatorUtils = require('../utils/validator');


fileRouter.post(
    '/signup',
    ...validatorUtils.validateLoginDetails,
    validator,
    authController.registration
);
fileRouter.post(
    '/signin',
    ...validatorUtils.validateLoginDetails,
    validator,
    authController.login
);
fileRouter.post('/signin/new_token', auth, authController.refresh);
fileRouter.get('/logout', auth, authController.logout);

module.exports = fileRouter;