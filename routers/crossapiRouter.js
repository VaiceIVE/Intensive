const Router = require('express')
const router = new Router()
const crossapiController = require('../controllers/crossapiController')
const multer = require("multer")()



router.post('/analyze', multer.single('file'), crossapiController.Analyze)



module.exports = router
