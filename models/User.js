const { Schema, model } = require('mongoose');

User = new Schema({
    email: {type: String, unique: true, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    dadsname: {type: String, required: true},
    roles: [{type: String}],
    hash: {type: String, required: true},
});

module.exports = model("User", User);