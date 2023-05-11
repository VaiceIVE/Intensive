const { Schema, model } = require('mongoose');

Trace = new Schema({
    user: {type: String, required: true},
    descriptor: {type: String, required: true},
    know: {type: Number, required: true},
    able: {type: Number, required: true},
    master: {type: Number,  required: true},
    filename: {type:String}
});

module.exports = model("Trace", Trace);