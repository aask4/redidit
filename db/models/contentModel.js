const database = require('../index');

const db = database.db;
const Sequelize = database.Sequelize;

const Content = db.define('Contents', {
  owner: Sequelize.INTEGER,
  content: Sequelize.STRING,
  score: Sequelize.INTEGER,
  parent: Sequelize.INTEGER,
<<<<<<< HEAD
  type: Sequelize.STRING,
});

Content.sync()
  .then(() => console.log("Content has been sync'd"))
  .catch(err => console.log('Error on model: ', err));
=======
  type: Sequelize.STRING
});

Content.sync()
  .then(() => console.log('Content has been sync\'d'))
  .catch((err) => console.log('Error on model: ', err));
>>>>>>> 25c1c8c7e8e9c52fe7c90123d72eb1ad35983d06

module.exports = Content;
