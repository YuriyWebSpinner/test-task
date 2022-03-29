const path = require('path');
const multer = require('multer');
const uuid = require('uuid');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file)
        const { originalname = '' } = file;
        cb(null, `${path.join(__dirname, '..', '..', process.env.FILE_PATH)}`);
    },
    filename: function (req, file, cb) {
        cb(null, `${uuid.v4()}-${Date.now()}${path.extname(file.originalname)}`);
    }
})

module.exports = {
    storage
};