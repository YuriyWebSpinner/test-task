const express = require('express');
const fileRouter = express.Router();
const multer = require("multer");
const { body, param, query } = require('express-validator');
const { validator } = require('../middlewares');
const filesController = require("../controllers/files");
const { storage } = require('../config/multer');

const uploadMiddleware = multer({ storage }).array('files');

fileRouter.post('/upload', uploadMiddleware, filesController.upload);
fileRouter.put(
    '/update/:id',
    param('id').isNumeric(),
    validator,
    uploadMiddleware,
    filesController.update
);
fileRouter.get(
    '/list',
    query('list_size').isNumeric(),
    query('page').isNumeric(),
    validator,
    filesController.list
);
fileRouter.get(
    '/:id',
    param('id').isNumeric(),
    validator,
    filesController.get
);
fileRouter.get(
    '/download/:id',
    param('id').isNumeric(),
    validator,
    filesController.download
);
fileRouter.delete(
    '/delete/:id',
    param('id').isNumeric(),
    validator,
    filesController.delete
);

module.exports = fileRouter;