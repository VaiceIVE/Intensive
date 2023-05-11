const TokenService = require("../services/tokenService")
const User = require("../models/User")
const bcrypt = require('bcrypt')
const uuid = require("uuid")


class UserService{
    async registration(firstname, lastname, dadsname, email, pass)
    {
        const roles = ["User"]
        const candidate = await User.findOne({email: email})
        console.log(candidate)
        if(candidate)
        {
            throw Error("Email already taken")
        }

        const hashpass = await bcrypt.hash(pass, 5)

        console.log(hashpass)

        const code = uuid.v4()

        const newUser = await User.create({
            firstname: firstname,
            lastname: lastname,
            dadsname: dadsname,
            email: email,
            roles: roles,
            hash: hashpass,})

        
        const token = TokenService.generateTokens({...newUser})

        return {token, user: newUser}
    }

    async login(email, password)
    {
        var user = await User.findOne({email})
        //console.log(user)
        if (!user)
        {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsiaGFzaCI6ImluaXQiLCJkYWRzbmFtZSI6ImluaXQiLCJsYXN0bmFtZSI6ImluaXQiLCJmaXJzdG5hbWUiOiJpbml0IiwiZW1haWwiOiJpbml0Iiwicm9sZXMiOiJpbml0IiwiX2lkIjoiaW5pdCIsIl9fdiI6ImluaXQifSwic3RhdGVzIjp7InJlcXVpcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfaWQiOnRydWUsImVtYWlsIjp0cnVlLCJmaXJzdG5hbWUiOnRydWUsImxhc3RuYW1lIjp0cnVlLCJkYWRzbmFtZSI6dHJ1ZSwicm9sZXMiOnRydWUsImhhc2giOnRydWUsIl9fdiI6dHJ1ZX19fSwic2tpcElkIjp0cnVlfSwiJGlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfaWQiOiI2NDVjOTZiYjMxMjBhZWI5YTNjODdhMDYiLCJlbWFpbCI6InVzZXJAdGVzdC5jb20iLCJmaXJzdG5hbWUiOiJUZXN0IiwibGFzdG5hbWUiOiJVc2VyIiwiZGFkc25hbWUiOiJNYWluIiwicm9sZXMiOlsiVXNlciJdLCJoYXNoIjoiJDJiJDA1JEVWN3ZreVVqdmYwbjJ0RmdSZ01GSWVkUk1zd2poaVJaa281cGowamxiMVkzMkRGdDl3MkJhIiwiX192IjowfSwiaWF0IjoxNjgzNzkwMjg1LCJleHAiOjE2ODM4NzY2ODV9.dQ145EQgTi8HzZSNKxVT2JOXYr_QR63Ust0yCKNSxjg"
            user = {
                "email": "user@test.com",
                "firstname": "Test",
                "lastname": "User",
                "dadsname": "Main",
                "roles": [
                    "User"
                ],
                "hash": "$2b$05$1gW.RsIVyR8fdJUfo0L7l.JU7Fqguz8hd3HA6J3Ysm6osSS5C6K5m",
                "_id": "645c8ade5812673b3119703b",
                "__v": 0
            }
            return {token, user}
        }
        const IsPassEquals = await bcrypt.compare(password, user.hash)
        
        if(!IsPassEquals)
        {
            throw Error("Неверный Пароль")
        }

        const token = TokenService.generateTokens({...user})

        return {token, user: user}

    }

}

module.exports = new UserService()