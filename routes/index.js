module.exports = (app) => {
	app.use(require('./health'));
	app.use(require('./route'));
};
