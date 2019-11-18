const to_json = require("csvtojson");
const Iconv = require('iconv').Iconv;
const fs = require("fs");
//const request = require('request');

module.exports = async function (body) {
    const text = new Buffer(body, 'binary');
    let conv = Iconv('windows-1251', 'utf8');
    body = conv.convert(text).toString();
    await fs.writeFile('./static/TimeTable.csv', body, 'utf8',
        async function (err) {
            if (!err) {
                // const readStream = fs.createReadStream('./static/TimeTable.csv');
                // const writeStream = fs.createReadStream('./static/result.json');
                // readStream.pipe(csv()).pipe(writeStream);
                await to_json()
                    .fromFile('./static/TimeTable.csv')
                    .then(function (json) {
                        console.log(json);
                        fs.writeFile('./static/result.json',
                            'utf8', function (err) {
                                if (err) {
                                    return false;
                                } else {
                                    return json;
                                }
                            });
                    });
            }
        });
    return false
};