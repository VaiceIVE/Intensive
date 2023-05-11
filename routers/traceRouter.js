const Router = require('express')
const router = new Router()
const TraceController = require('../controllers/traceController')


router.get('/traces/get/:token', TraceController.GetByToken)




module.exports = router
