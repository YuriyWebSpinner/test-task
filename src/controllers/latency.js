const rc = require("../utils/response-creator");

function measureLag(iteration) {
    const start = new Date()
    setTimeout(() => {
        const lag = new Date() - start;
        console.log(`Loop ${iteration} took\t${lag} ms`);
        if(iteration < 400) {
            measureLag(iteration + 1);
        }
    })
}

class LatencyController {
    async info (req, res, next) {
        try {
            const { success } = rc(res);
            measureLag(1);

            return success();
        } catch (e) {
            console.log(e);
            next(e);
        }
    }
}

module.exports = new LatencyController();