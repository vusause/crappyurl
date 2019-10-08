const config  = require('../config');
const models  = require('../models');
const router  = require('express').Router();
const shortid = require('shortid');

const domain  = config.domain;

// Will replace with Sequelize Client
const DB = {};

router.get('/:hash', (req, res) => {
    const { hash } = req.params;
    models.get_url(hash).then((url) => {
        if (url == null) { throw new Error('URL does not exist'); }
        return res.redirect(url.original_url);
    }).catch((err) => {
        res.sendStatus(400);
    });
});

router.post('/', (req, res) => {
    const { url } = req.body;
    const http_check = new RegExp('^(http|https)://', 'i');
    let validate_url;

    // Check if url starts with http/https
    if (http_check.test(url)) {
        validate_url = new RegExp('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})', 'gi');
    } else {
        validate_url = new RegExp('((?:www\.)[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})', 'gi');
        url = 'https://' + url;
    }

    // validate user url and return shortened url
    if (validate_url.test(url)) {
        models.add_url(url).then((path) => {
            if (path == null) {
                throw new Error('URL does not exist'); 
            }
            res.json({ payload: domain + '/' + path });
        }).catch((err) => {
            console.error(err);
            return res.sendStatus(500);
        });
    } else {
        return res.status(400).send('Error: Invalid URL Provided');
    }
});

module.exports = router;
