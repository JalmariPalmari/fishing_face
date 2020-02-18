const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kalastuspaiva_schema = new Schema({
    text: {
        type: String,
        required: true
    }
});
const kalastuspaiva_model = new mongoose.model('kalastuspaiva', kalastuspaiva_schema);

module.exports = kalastuspaiva_model;