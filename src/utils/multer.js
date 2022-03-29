const fs = require('fs');
const multer = require('multer');

const downloadFile = (req, res, next) => {
    const { query = {} } = req;
    const { id = '' } = query;
    const filename = id;
    try {
        const fileStream = fs.createWriteStream(filename);
        res.pipe(fileStream);
        fileStream.on('finish', () => fileStream.close());
    } catch (err) {
        next(err);
    }
}

const fileUpload = (req, res, next) => {
    const upload = multer().array('files');
    upload(req, res, function (err) {
        if (err) next(err);
    });
}

module.exports = {
    downloadFile,
    fileUpload
}