const {
  db,
  Sequelize,
} = require('../index');

const Content = db.define('Contents', {
  owner: Sequelize.INTEGER,
  content: Sequelize.STRING,
  score: Sequelize.INTEGER,
  parent: Sequelize.INTEGER,
  type: Sequelize.STRING,
});

Content.sync()
  .then(() => console.log('Content has been sync\'d'))
  .catch(err => console.log('Error on model: ', err));

module.exports = Content;
