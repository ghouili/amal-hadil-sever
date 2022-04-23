const mongoose = require('mongoose');

const schema = mongoose.Schema;

const consmSchema = new schema ({
    intensite:{type: Number, required: true},
    problem:{type: String, required: true},
    iduser:{type: Number, required: true},
    date: {type: String, required: true},
    time: {type: String, required: true},
})

module.exports = mongoose.model('consm', consmSchema);