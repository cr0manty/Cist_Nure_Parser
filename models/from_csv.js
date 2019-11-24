const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CSVSchema = new Schema({
    subject: {
        type: String,
        required: true,
    },
    startDateTime: {
        type: Number,
        required: true,
    },
    endDateTime: {
        type: Number,
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
        type: Number,
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
    },
    subject_data: {
        name: {
            type: String
        },
        type: {
            type: String
        },
        room: {
            type: String
        },
        groups: {
            type: Array
        }
    }
});

CSVSchema.pre('save', function (next) {
    try {
        const data = this.subject.split(' ');
        this.subject_data.name = data[0];
        this.subject_data.type = data[1];
        this.subject_data.room = data[2];

        const groups_info = data[3].split(';');
        for (let i of groups_info) {
            const groups = i.split(',');
            this.subject_data.groups.push(groups[0]);
            const group_name = groups[0].substr(0, groups[0].lastIndexOf('-') + 1);
            for (let i = 1; i < groups.length; i++) {
                this.subject_data.groups.push(group_name + groups[i]);
            }
        }
        next();
    } catch (e) {
        console.log(`Error: ${e}`);
    }
});

let CSV = mongoose.model('CSV', CSVSchema);
module.exports = CSV;