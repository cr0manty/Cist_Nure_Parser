const to_json = require("csvtojson");
const Iconv = require('iconv').Iconv;
const save_csv = require('./csv_to_bd');

module.exports = async function (body) {
    const text = new Buffer(body, 'binary');
    let conv = Iconv('windows-1251', 'utf8');
    body = conv.convert(text).toString();
    to_json()
        .fromString(body)
        .then(function(json) {
            save_csv(json);
            return true;
        });
    return false;
};