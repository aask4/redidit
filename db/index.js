const Sequelize = require('sequelize');

let db;
if (process.env.DATABASE_URL) {
  const match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
  db = new Sequelize(match[5], match[1], match[2], {
    host: match[3],
    port: match[4],
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
} else {
  db = new Sequelize('redidit', 'redidit', 'redidit', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });
}

db
  .authenticate()
  .then(() => console.log('redidit database is connected'))
  .catch(err => console.log('Error: ', err));

module.exports = { db, Sequelize };
