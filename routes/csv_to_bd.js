const CSV = require('../models/from_csv');

module.exports = async function(json) {
    json.forEach(function (obj) {
        const values = Object.values(obj);
        console.log(values[0]);
        const data = {
            subject: values[0],
            //...
        };
        CSV.create(data, function (err, data) {
            if(err) {
                console.log(err);
            };
            //...
        })
    });
};