const User = require("../db/mysql/models/User");
const bcrypt = require('bcrypt');
const tokenService = require('./token');
const userService = require('./user');
const ApiError = require('../exceptions/api-error');


class AuthService {
    async registration(id, password) {
        const candidate = await userService.get(id);
        if (candidate) {
            throw ApiError.BadRequest(`User with email address ${id} already exists`);
        }
        const user = await userService.create({id, password});
        const payload = {
            id: user.id,
            datetime: new Date(),
            ver: 1
        };
        const tokens = tokenService.generateTokens(payload);
        const tokenData = {
            refresh_token: tokens.refreshToken,
            user_id: user.id,
            expiresIn: new Date().getTime() + 3 * 24 * 60 * 60 * 1000,
            createdAt: new Date()
        }
        await tokenService.saveToken(user.id, tokenData);

        return {...tokens, user: { id: user.id }}
    }

    async login(id, password) {
        const user = await userService.get(id);
        if (!user) {
            throw ApiError.BadRequest('User with this email or phone was not found')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Invalid password');
        }
        const payload = {
            id: user.id,
            datetime: new Date(),
            ver: 0
        };
        const tokens = tokenService.generateTokens(payload);
        const tokenData = {
            refresh_token: tokens.refreshToken,
            expiresIn: new Date().getTime() + 3 * 24 * 60 * 60 * 1000,
            createdAt: new Date(),
            user_id: user.id
        };
        await tokenService.saveToken(user.id, tokenData);

        return {
            ...tokens,
            id: user.id
        }
    }

    async logout(refreshToken) {
        return await tokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken, accessToken) {
        const { ver: accTokenVer = 1 } = tokenService.decode(accessToken);
        if (!refreshToken && accTokenVer) {
            throw ApiError.UnauthorizedError();
        }
        const userData = accTokenVer ? tokenService.validateRefreshToken(refreshToken)
            : tokenService.validateAccessToken(accessToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await userService.get(userData.id);
        const payload = {
            id: user.id,
            datetime: new Date(),
            ver: 1
        };
        const tokens = tokenService.generateTokens(payload);

        const tokenData = {
            refresh_token: tokens.refreshToken,
            expiresIn: new Date().getTime() + 3 * 24 * 60 * 60 * 1000,
            createdAt: new Date(),
            user_id: user.id
        };
        await tokenService.saveToken(user.id, tokenData);
        return {...tokens, id: user.id };
    }
}

module.exports = new AuthService();