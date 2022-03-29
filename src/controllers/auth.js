const authService = require('../services/auth');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');
const rc = require("../utils/response-creator");

class AuthController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()));
            }
            const { id, password } = req.body;
            const userData = await authService.registration(id, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 3 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const { id = 0, password = '' } = req.body;
            const userData = await authService.login(id, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 3 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async refresh (req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) return next(ApiError.UnauthorizedError());
            const accessToken = authorizationHeader.split(' ')[1];
            if (!accessToken) return next(ApiError.UnauthorizedError());
            const userData = await authService.refresh(refreshToken, accessToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 3 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async logout(req, res, next) {
        const { success } = rc(res);
        try {
            const { refreshToken } = req.cookies;
            await authService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return success();
        } catch (e) {
            console.log(e);
            next(e);
        }
    }
}

module.exports = new AuthController();