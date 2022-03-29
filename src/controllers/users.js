const rc = require("../utils/response-creator");

class UserController {
    async info (req, res, next) {
        const { success } = rc(res);
        const { user = {} } = req;

        return success({ data: {id: user.id} });
    }
}

module.exports = new UserController();
