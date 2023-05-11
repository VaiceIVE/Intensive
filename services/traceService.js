const TraceModel = require("../models/Trace")

class TraceService
{
    async GetById(id)
    {
        const Traces = await TraceModel.find({"user": id})
        const skills = []
        for(const elem of Traces)
        {
            console.log(elem)
            skills.push({'sledName': elem.descriptor, "fileName":elem.filename, "zyv": [elem.know, elem.able, elem.master]})
        }
        return skills
    }
}

module.exports = new TraceService()