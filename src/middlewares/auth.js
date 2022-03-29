const ApiError = require('../exceptions/api-error');
const tokenService = require('../services/token');

module.exports = function (req, res, next) {
    try {
        const { refreshToken = '' } = req.cookies;

        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) return next(ApiError.UnauthorizedError());

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) return next(ApiError.UnauthorizedError());

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) return next(ApiError.UnauthorizedError());

        if(userData.ver && !refreshToken) {
            return next(ApiError.UnauthorizedError());
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
};