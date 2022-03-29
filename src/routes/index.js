const { errorHandler, error404Handler, auth } = require('../middlewares');
const userConstroller = require("../controllers/users");
const latencyConstroller = require("../controllers/latency");
const authRouter = require('./auth');
const fileRouter = require('./files');

const routes = (app) => {
    app.use(authRouter);
    app.use('/file', auth, fileRouter);
    app.get('/info', auth, userConstroller.info);
    app.get('/latency', auth, latencyConstroller.info);
    app.use(errorHandler);
    app.use(error404Handler);
}

module.exports = routes;
