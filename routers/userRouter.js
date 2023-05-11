const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')


router.post('/register', userController.Register)
router.post('/login', userController.Login)




module.exports = router
