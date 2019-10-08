'use strict';

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const shortid   = require('shortid');
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

sequelize.sync(sync_config);

db.get_url = (hash) => {
	return db.urls.findOne({
		where: { hash: hash },
	}).then((url) => {
		if (url == null) { throw new Error('URL does not exist'); }
		return url;
	}).catch((err) => {
		console.error(err);
	});
}

db.get_hash = (url) => {
	return db.urls.findOne({
		where: { original_url: url },
	}).then((e) => {
		return e;
	}).catch((err) => {
		console.error(err);
	});
}

db.add_url = (url) => {
	return db.get_hash(url).then((e) => {
		if (e != null) {
			return e.hash;
		} else {
			const url_entry = {
				original_url: url,
				hash: shortid.generate(),
			}
			return db.urls.create(url_entry).then((e) => {
				return e.hash;
			})
		}
	}).catch((err) => {
		console.error(err);
		return null;
	});
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
