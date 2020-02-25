const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kalastuspaiva_schema = new Schema({
    paivays: {
        type: String,
        required: true
    },
    paikka: {
        type: String,
        required: true
    },
    kommentit: {
        type: String,
        required: true
    },
    saaliit: [{
        type: mongoose.Schema.types.ObjectId,
        ref: 'saaliit'
    }]
});
const kalastuspaiva_model = new mongoose.model('kalastuspaiva', kalastuspaiva_schema);

module.exports = kalastuspaiva_model;