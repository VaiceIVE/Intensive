const tokenService = require("../services/tokenService")
const { validateAccessToken } = require("../services/tokenService")
const traceService = require("../services/traceService")

class TraceController
{
    async GetByToken(req, res, next)
    {
        try {
            const token = req.params.token
            const userdata = validateAccessToken(token)
            const user = userdata._doc
            const traces = await traceService.GetById(user._id)
            res.json(traces)
        } catch (e) {
            console.log(e)
        }

    }
}

module.exports = new TraceController()