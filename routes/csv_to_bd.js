const CSV = require('../models/from_csv');

function to_time(date, time) {
    return new Date(`${date} ${time} GMT`);
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