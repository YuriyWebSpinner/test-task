const jwt = require('jsonwebtoken');
const Token = require("../db/mysql/models/Tokens");

class TokenService {
    generateTokens (payload, accessExpiresIn = '10m', refreshExpiresIn = '3d') {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: accessExpiresIn});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: refreshExpiresIn});
        return {
            accessToken,
            refreshToken
        }
    }

    async findToken (refreshToken) {
        return await Token.findOne({where: {refresh_token: refreshToken}});
    }

    decode (token = '') {
        return jwt.decode(token);
    }

    validateAccessToken (token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken (token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        } catch (e) {
            return null;
        }
    }

    async saveToken (userId, values) {
        return await Token.update(values, {where: {user_id: userId}});
    }

    async removeToken (refreshToken) {
        return await Token.destroy({where: {refresh_token: refreshToken}});
    }
}

module.exports = new TokenService();