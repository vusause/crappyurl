const config = {};

// ======= GLOBAL =======
config.domain = process.env.DOMAIN;

// ====== POSTGRES ======
config.db = {};
config.db.user = process.env.PG_USER;
config.db.password = process.env.PG_PASS;
config.db.name = process.env.PG_NAME;

// ====== EXPRESS =======
config.server = {};

config.server.port = process.env.PORT || 9999;

module.exports = config;
