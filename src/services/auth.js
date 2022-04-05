const User = require("../db/mysql/models/User");
const bcrypt = require('bcrypt');
const tokenService = require('./token');
const userService = require('./user');
const ApiError = require('../exceptions/api-error');


class AuthService {
    async registration(username, password) {
        const candidate = await userService.get(username);
        if (candidate) {
            throw ApiError.BadRequest(`User with email address ${username} already exists`);
        }
        const user = await userService.create({username, password});
        const payload = {
            id: user.id
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

    async login(username, password) {
        const user = await userService.get(username);
        if (!user) {
            throw ApiError.BadRequest('User with this email or phone was not found')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Invalid password');
        }
        const payload = {
            id: user.id
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

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await userService.get(userData.id);
        const payload = {
            id: user.id,
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