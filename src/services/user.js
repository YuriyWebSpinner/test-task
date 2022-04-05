const ApiError = require('../exceptions/api-error');
const User = require("../db/mysql/models/User");
const bcrypt = require("bcrypt");


class UserService {
    async create(values) {
        const {
            username = '',
            password = ''
        } = values;
        const hashPassword = await bcrypt.hash(password, 3);
        return await User.create({username, password: hashPassword});
    }

    async getAll(page=1, size=10) {
        return await User.findAll({ limit: page*size, offset: (page-1)*size });
    }

    async get (username) {
        return await User.findOne({where: {username}});
    }

    async getByID (id) {
        return await  User.findByPk(id);
    }

    async update (values) {
        await User.update(values, { where: {id: values.id} });
    }

    async delete ( id ) {
        const user = await User.findByPk(id);
        if(!user) throw ApiError.NotFound();
        await user.destroy();
    }
}

module.exports = new UserService();