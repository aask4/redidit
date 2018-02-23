const { db, Sequelize } = require('../index');
const User = require('./usersModel');

const Content = db.define('Contents', {
  content: Sequelize.STRING,
  score: Sequelize.INTEGER,
  type: Sequelize.STRING,
});

Content.hasOne(User, { as: 'owner' });
Content.hasOne(Content, { as: 'parent' });

Content.sync()
  .then(() => console.log("Content has been sync'd"))
  .catch(err => console.log('Error on model: ', err));

module.exports = Content;
