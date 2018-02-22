const Sequelize = require('sequelize');
const db = new Sequelize('redidit', 'redidit', 'redidit', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

db.authenticate()
  .then( () => console.log('redidit database is connected'))
  .catch( err => console.log('Error: ', err));

module.exports = {db, Sequelize};