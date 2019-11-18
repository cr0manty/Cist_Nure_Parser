const to_json = require("csvtojson");
const Iconv = require('iconv').Iconv;
const fs = require("fs");

module.exports = function (body) {
    const text = new Buffer(body, 'binary');
    let conv = Iconv('windows-1251', 'utf8');
    body = conv.convert(text).toString();
    fs.writeFile('./static/TimeTable.csv', body, 'utf8',
        function (err) {
            if (!err) {
                to_json()
                    .fromFile('./static/TimeTable.csv')
                    .then(function (json) {
                        console.log(json);
                        fs.writeFile('./static/result.json', json,
                            'utf8', function (err) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    return true;
                                }
                            });
                    });
            }
        });
    return false
};