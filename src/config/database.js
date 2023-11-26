const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

if (!process.env.DB_URL) {
  console.error('DB_URL environment variable not defined');
  process.exit(1);
}

const connectionUri = process.env.DB_URL;

const sequelize = new Sequelize(connectionUri, {
  pool: {
    max: 3,
    min: 1,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.error('Error connecting to database\n' + err);
  });

module.exports = sequelize;
