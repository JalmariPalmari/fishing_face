const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user_schema = new Schema({
    name: {
        type: String,
        required: true
    },
    kalastuspaivaMongoObject: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'kalastuspaivaMongoModel',
        req: true
    }],
    saaliitMongoObject: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'saaliitMongoModel',
        req: true
      
    }]

});
const user_model = mongoose.model('user', user_schema);

module.exports = user_model;