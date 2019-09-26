const config  = require('../config');
const router  = require('express').Router();
const shortid = require('shortid');

const domain  = config.domain;

require('../models');

// Will replace with Sequelize Client
const DB = {};

router.get('/:hash', (req, res) => {
    const { hash } = req.params;
    if (DB.hasOwnProperty(hash)) {
        return res.redirect(DB[hash]);
    }
    res.sendStatus(400);
});

router.post('/', (req, res) => {
    const { url } = req.body;
    const http_check = new RegExp('^(http|https)://', 'i');
    const path = shortid.generate();
    let validate_url;

    // Check if url starts with http/https
    if (http_check.test(url)) {
        validate_url = new RegExp('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})', 'gi');
        DB[path] = url;
    } else {
        validate_url = new RegExp('((?:www\.)[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})', 'gi');
        DB[path] = 'https://' + url;
    }

    // validate user url and return shortened url
    if (validate_url.test(url)) {
        const full_url = domain + '/' + path;
        res.json({ payload: full_url });
    }

    return res.status(400).send('Error: Invalid URL Provided');
});

module.exports = router;
