const UserService = require("../services/userService")

class UserController
{
    async Register(req, res)
    {
        try {


            const {firstname, lastname, dadsname, email, pass} = req.body;

            const userData = await UserService.registration(firstname, lastname, dadsname, email, pass)
        
            return res.json(userData)

            
        } catch (e) {
            res.json(e)
            console.log(e)
        }

    }

    async Login(req, res)
    {
        try {

            const {email, password} = req.body

            const userData = await UserService.login(email, password)

            return res.json(userData)
            
        } catch (e) {
            res.json(e)
            console.log(e)
        }
    }
}




module.exports = new UserController()
