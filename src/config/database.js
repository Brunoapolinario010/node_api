const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize({
	dialect: 'postgres',
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT),
	database: process.env.DB_NAME,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	pool: {
		max: 3,
		min: 1,
		idle: 10000
	},
});

sequelize.authenticate().then(() => {
	console.log('Connected to database');
}).catch((err) => {
	console.error('Error connecting to database' + err);
});

console.log(sequelize.models);

module.exports = sequelize;