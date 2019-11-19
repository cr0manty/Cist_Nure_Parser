const CSV = require('../models/from_csv');

function to_time(date, time) {
    date = date.split('.');
    time = time.split(':');
    return new Date(date[2], date[1]-1, date[0], time[0], time[1], time[2]);
}

module.exports = function (json) {
    json.forEach(function (obj) {
        const values = Object.values(obj);
        const data = {
            subject: values[0],
            startDateTime: to_time(values[1], values[2]),
            endDateTime: to_time(values[3], values[4]),
            dailyEvent: values[5] === 'Истина',
            alertOnOff: values[6] === 'Истина',
            alertDateTime: to_time(values[7], values[8]),
            atThisTime: +values[9],
            importance: values[10],
            description: values[11],
            mark: values[12],
        };
        CSV.create(data)
    });
};