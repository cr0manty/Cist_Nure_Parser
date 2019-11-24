const express = require('express');
const router = express.Router();
const fs = require('fs');
const request = require('request');
const csv_to_mongo = require('./prepareCsv');


router.get('/', function (req, res) {
    if (!req.query.length) {
        return res.render('index', {files_amount: 8});
    }

    try {
        let data = {
            groupId: req.query.groupId,
            dateStart: req.query.dateStart,
            dateEnd: req.query.dateEnd,
            type: req.query.type
        };
        const url = `http://cist.nure.ua/ias/app/tt/WEB_IAS_TT_GNR_RASP.GEN_GROUP_POTOK_RASP?ATypeDoc=3&Aid_group=${data.groupId}&Aid_potok=0&ADateStart=${data.dateStart}&ADateEnd=${data.dateEnd}&AMultiWorkSheet=0`;
        request.get(url, function (err, res, data) {
            if (err) {
                console.log(err);
                return res.send(404);
            } else if (data) {
                // check if exist in mongo
                csv_to_mongo(data);
                // ...
                // send json file
            }
        });
    } catch (e) {
        return res.send(404);
    }
});

router.post('/', function (req, res, next) {
    const form = req.body;
    if (!form.test && !form.test_file) {
        if (!form.group_id || !form.date_end || !form.date_start)
            res.redirect('/');
    }
    if (form.test_file) {
        fs.readFile(`./tests/${form.test_file}.csv`, 'binary',
            function (err, data) {
                if (err) {
                    console.log(err);
                } else if (data) {
                    csv_to_mongo(data);
                }
            });
        return res.redirect('/');
    } else {
        form.date_start = form.date_start.replace('-', '.');
        form.date_end = form.date_end.replace('-', '.');

        const url = `http://cist.nure.ua/ias/app/tt/WEB_IAS_TT_GNR_RASP.GEN_GROUP_POTOK_RASP?ATypeDoc=3&Aid_group=${form.group_id}&Aid_potok=0&ADateStart=${form.date_start}&ADateEnd=${form.date_end}&AMultiWorkSheet=0`;
        const test_url = `http://cist.nure.ua/ias/app/tt/WEB_IAS_TT_GNR_RASP.GEN_GROUP_POTOK_RASP?ATypeDoc=3&Aid_group=6283377&Aid_potok=0&ADateStart=01.09.2019&ADateEnd=31.01.2020&AMultiWorkSheet=0`;

        const main_url = form.test ? test_url : url;
        request.get(main_url, function (err, res, data) {
            if (err) {
                console.log(err);
            } else if (data) {
                csv_to_mongo(data);
                return res.redirect('/');
            }
        });
    }
});

module.exports = router;
