const express = require('express');
const router = express.Router();
const request = require('request');
const fs = require("fs");
const http = require('http');

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/', function (req, res, next) {
    const form = req.body;
    const true_url = `http://cist.nure.ua/ias/app/tt/WEB_IAS_TT_GNR_RASP.GEN_GROUP_POTOK_RASP?ATypeDoc=3&Aid_group=6283377&Aid_potok=0&ADateStart=01.09.2019&ADateEnd=31.01.2020&AMultiWorkSheet=0`;
    const url = `http://cist.nure.ua/ias/app/tt/WEB_IAS_TT_GNR_RASP.GEN_GROUP_POTOK_RASP?ATypeDoc=3&Aid_group=${form.group_id}
        &Aid_potok=0&ADateStart=${form.date_start}&ADateEnd=${form.date_end}&AMultiWorkSheet=0`;

    const file = fs.createWriteStream("file.csv", 'utf8');
    const requests = http.get(true_url, function (response) {
        response.pipe(file);
    });

    request(true_url, function (err, res, body) {
        if (body) {
        }
    });
    // if (form.group_id && form.date_start && form.date_end) {
    //
    // } else {
    //     res.send(404);
    // }
});

module.exports = router;
