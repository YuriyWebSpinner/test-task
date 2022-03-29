const path = require("path");
const ApiError = require('../exceptions/api-error');
const fileServices = require('../services/files');
const rc = require("../utils/response-creator");

class FileController {
    async upload (req, res, next) {
        const { success } = rc(res);
        const { files = [] } = req;
        try {
            const filesData = files.map(file => {
                const {
                    filename = '',
                    mimetype = '',
                    size = 0,
                } = file;

                return {
                    name: filename,
                    ext: path.extname(filename),
                    mime: mimetype,
                    size: size,
                    date_upload: new Date(),
                    user_id: req.user.id
                }
            });

            await fileServices.create(filesData);
            return success({data: filesData});
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async download (req, res, next) {
        const { params = {} } = req;
        const { id = '' } = params;
        try {
            const file = await fileServices.get(id);
            const filePath = path.resolve(__dirname, '..', '..', process.env.FILE_PATH, file.name);
            res.download(filePath);
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async get (req, res, next) {
        const { success } = rc(res);
        const { params = {} } = req;
        const { id = 0 } = params;
        try {
            const file = await fileServices.get(id);
            return success({data: file});
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async update (req, res, next) {
        const { success } = rc(res);
        const {
            params = {},
            files = []
        } = req;
        const { id = 0 } = params;
        const {
            filename = '',
            mimetype = '',
            size = 0,
        } = files[0];
        try {
            const oldFile = await fileServices.get(id);
            const filePath = path.resolve(__dirname, '..', '..', process.env.FILE_PATH, oldFile.name);
            if (!filePath) throw ApiError.FileNotFound();
            await fileServices.deleteFromStorage(filePath);
            const data = {
                id,
                name: filename,
                ext: path.extname(filename),
                mime: mimetype,
                size: size,
                date_upload: new Date(),
                user_id: req.user.id
            };
            const newFile = await fileServices.update(data);
            return success({ data: newFile });
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async list (req, res, next) {
        const { success } = rc(res);
        const { query = {} } = req;
        const {
            list_size = 10,
            page = 1
        } = query;
        try {
            const files = await fileServices.getAll(page, list_size);
            return success({
                data: {
                    data: files,
                    meta: {
                        page,
                        size: list_size
                    }
                }
            });
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async delete (req, res, next) {
        const { success } = rc(res);
        const { params = {} } = req;
        const { id } = params;
        try {
            await fileServices.delete(id);
            success({data: {status: 'success'}})
        } catch (e) {
            console.log(e);
            next(e);
        }
    }
}

module.exports = new FileController();
