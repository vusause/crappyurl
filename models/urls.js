module.exports = (sequelize, DataTypes) => {
	return sequelize.define('urls', {
		hash: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		original_url: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	}, {});
};
