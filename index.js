'use strict';

const config      = require('./config');
const express     = require('express');
const http        = require('http');
const body_parser = require('body-parser');


// CORS middleware
const cors = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); // Should use DNS name from k8s service
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

const app     = express();
const server  = http.createServer(app);

app.use(body_parser.json());
app.use(express.static('public'));

app.use(cors);

require('./routes')(app);

server.listen(config.server.port, null, () => {
	console.log('Express webserver configured and listening at http://localhost:' + config.server.port);
});
