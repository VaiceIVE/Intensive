const axios = require('axios');
const FormData = require('formdata');
const TraceModel = require('../models/Trace');
const { validateAccessToken } = require('../services/tokenService');

class crossapiController{
    async Analyze(req, res)
    {
        const file = req.file;

        console.log((file.buffer).toString('utf8'))

        try{
            //console.log(req.body.accessToken)
            const userdata = validateAccessToken(req.body.accessToken)
            console.log(userdata)
            const user = userdata._doc
            let form = new FormData()
            form.append("id", user._id)
            form.append("name_of_event", "Common description")
            form.append("event_description", (file.buffer).toString('utf8'))
            const res2 = await axios.post("http://127.0.0.1:8080/students_event_description/", {id: 123, name_of_event: "Common description", event_description: (file.buffer).toString('utf8')})
            console.log(res2.data.skills)
            var skills = []
            for(const [key, value] of Object.entries(res2.data.skills))
            {
                console.log(key)
                console.log(value)
                await TraceModel.create({
                    user: user._id,
                    descriptor: key,
                    know: value.know,
                    able: value.can,
                    master: value.master,
                    filename: file.originalname
                }
                )
                skills.push({'sledName': key, "fileName":file.originalname, "zyv": [value.know, value.can, value.master]})
            }
            console.log(file.originalname)
            res.json(skills)

        }
        catch(err){
            res.json(err)
            console.log(err)
        }
    }
}

module.exports = new crossapiController()