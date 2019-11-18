const express = require('express');
const router = express.Router();
const fs = require("fs");
const request = require('request');
const create_json = require('./create_json');


router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});


router.post('/', async function (req, res, next) {
    const form = req.body;
    if (!form.test) {
        if (!form.group_id || !form.date_end || !form.date_start)
            res.redirect('/');
    }

    form.date_start = form.date_start.replace('-', '.');
    form.date_end = form.date_end.replace('-', '.');

    const test_url = `http://cist.nure.ua/ias/app/tt/WEB_IAS_TT_GNR_RASP.GEN_GROUP_POTOK_RASP?ATypeDoc=3&Aid_group=6283377&Aid_potok=0&ADateStart=01.09.2019&ADateEnd=31.01.2020&AMultiWorkSheet=0`;
    const url = `http://cist.nure.ua/ias/app/tt/WEB_IAS_TT_GNR_RASP.GEN_GROUP_POTOK_RASP?ATypeDoc=3&Aid_group=${form.group_id}&Aid_potok=0&ADateStart=${form.date_start}&ADateEnd=${form.date_end}&AMultiWorkSheet=0`;

    const main_url = form.test ? test_url : url;
    if (form.test_file) {
        fs.readFile("./static/test.csv", 'binary',
            async function (err, data) {
                if (err)
                    console.log(err);
                else if (data) {
                    const json = await create_json(data);
                    res.redirect('result.json');
                }
            });
    } else {
        await request.get(main_url, function (err, res, body) {
            if (!err && body) {
                create_json(body);
                req.redirect('/result');
            }
        });
    }
});

router.get('/result', async function (req, res, next) {
    res.render('result');
    // await fs.readFile("./static/result.json", 'utf8',
    //     async function (err, data) {
    //         if (!err && data) {
    //             console.log(data);
    //             res.render('result', {csv: data});
    //         } else {
    //             res.redirect('/');
    //         }
    //     });
});


module.exports = router;
