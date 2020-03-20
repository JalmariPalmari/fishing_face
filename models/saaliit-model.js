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
    saa: {
        type: String,
        required: true
    },
    image_url:{
        type: String,
    }

});
const saaliit_model = new mongoose.model('saaliitmongo', saaliit_schema);

module.exports = saaliit_model;