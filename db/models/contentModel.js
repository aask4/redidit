const { db, Sequelize } = require('../index');
const User = require('./usersModel');

const Content = db.define('Contents', {
  owner: Sequelize.STRING,
  content: Sequelize.STRING,
  score: Sequelize.INTEGER,
  type: Sequelize.STRING,
  parent: Sequelize.INTEGER,
  subredidit: Sequelize.STRING,
});

Content.sync()
  .then(() => console.log("Content has been sync'd"))
  .catch(err => console.log('Error on model: ', err));

module.exports = Content;
