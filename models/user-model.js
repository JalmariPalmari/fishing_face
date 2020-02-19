const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user_schema = new Schema({
    name: {
        type: String,
        required: true
    },
    // fishnotes: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'fishnote',
    //     req: true
    // }],
    kalastuspaivat: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'kalastuspaiva',
        req: true
    }]
});
const user_model = mongoose.model('user', user_schema);

module.exports = user_model;