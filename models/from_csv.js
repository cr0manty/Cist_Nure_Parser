const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CSVSchema = new Schema({
    subject: {
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

// CSVSchema.pre('save', function (next) {
//     let user = this;
//     bcrypt.hash(user.password, 10, function (err, hash) {
//         if (err) {
//             return next(err);
//         }
//         user.password = hash;
//         next();
//     })
// });

let CSV = mongoose.model('CSV', CSVSchema);
module.exports = CSV;