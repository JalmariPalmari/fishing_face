const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fishnote_schema = new Schema({
    text: {
        type: String,
        required: true
    }
});
const fishnote_model = new mongoose.model('fishnote', fishnote_schema);

module.exports = fishnote_model;