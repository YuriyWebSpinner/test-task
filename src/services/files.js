const fs = require('fs');
const fsPromise = require('fs/promises');
const path = require('path');
const ApiError = require('../exceptions/api-error');
const File = require("../db/mysql/models/Files");


class FilesService {
    async create(files) {
        await File.bulkCreate(files);
        return files;
    }

    async getAll(page=1, size=10) {
        return await File.findAll({ limit: page*size, offset: (page-1)*size });
    }

    async get (id) {
        const file = await File.findByPk(id);
        if(!file) throw ApiError.NotFound();
        return file;
    }

    async update (values) {
        await File.update(values, { where: {id: values.id} });
    }

    async delete ( id ) {
        const file = await File.findByPk(id);
        if(!file) throw ApiError.NotFound();
        const pathFile = path.resolve(__dirname, '..', '..', process.env.FILE_PATH, file.name);
        await this.deleteFromStorage(pathFile);
        await file.destroy();
    }

    async deleteFromStorage (pathFile) {
        if(!fs.existsSync(pathFile)) throw ApiError.FileNotFound();
        await fsPromise.unlink(pathFile);
    }
}

module.exports = new FilesService();