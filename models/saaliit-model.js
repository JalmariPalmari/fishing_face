const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saaliit_schema = new Schema({
    kalalaji: {
        type: String,
        required: true
    },
    paino: {
        type: Number,
        required: true
    },
    sää: {
        type: String,
        required: true
    }
});
const saaliit_model = new mongoose.model('saaliit', saaliit_schema);

module.exports = saaliit_model;