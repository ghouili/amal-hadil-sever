const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = new schema ({
    email: {type: String, required: true, unique: true},
    nom: {type: String, required: true},
    prenom: {type: String, required: true},
    tel: {type: String, required: true},
    adress: {type: String, required: true},
    birthdate: {type: String, required: true},
    password: {type: String, required: true},
    avatar: {type: String, required: true},
    intenstes: [{type: mongoose.Types.ObjectId, required: true, ref: "consm" }]
})

module.exports = mongoose.model('user', userSchema);