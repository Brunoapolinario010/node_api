const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('users', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
		},
		nome: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		senha: {
			type: DataTypes.STRING,
			allowNull: false
		},
		telefones: {
			type: DataTypes.JSON,
		},
		data_criacao: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			allowNull: false
		},
		data_atualizacao: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			allowNull: false
		},
		ultimo_login: {
			type: DataTypes.DATE
		},
	});

	sequelize.sync({ force: true });
};