const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const JSONSchema = new Schema({
    'time-zone': {
        type: String,
        required: true,
    },
    startDateTime: {
        type: Date,
        required: true,
    },
    endDateTime: {
        type: Date,
        required: true,
    },
    dailyEvent: {
        type: Boolean,
        required: true,
    },
    alertOnOff: {
        type: Boolean,
        required: true,
    },
    alertDateTime: {
        type: Date,
        required: true,
    },
    atThisTime: {
        type: Number,
        required: true,
    },
    importance: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    mark: {
        type: String,
        required: true,
    }
});

let JSON = mongoose.model('JSON', JSONSchema);
module.exports = JSON;