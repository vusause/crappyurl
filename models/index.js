'use strict';

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const config    = require('../config');
const db        = {};

const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, {
	host: 'localhost',
	port: 5432,
	dialect: 'postgres',
});

const sync_config = { force: true }; 

sequelize.authenticate().then(() => {
	console.log('Connection to DB success');
}).catch((err) => {
	console.error('Unable to connect to the database:', err);
});

fs.readdirSync(__dirname).filter((file) => {
	return (file.indexOf('.') !== 0) && (file != 'index.js') && (file.slice(-3) === '.js');
}).forEach((file) => {
	const model = sequelize['import'](path.join(__dirname, file));
	db[model.name] = model;
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
