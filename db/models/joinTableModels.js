const { db, Sequelize } = require('../index');
const Users = require('./usersModel');
const Content = require('./contentModel');
const Subredidit = require('./subrediditModel');

const Content_Users = db.define('Content_Users', {});
const Subredidit_Users = db.define('Subredidit_Users', {});

Users.belongsToMany(Content, {
  through: 'Content_Users',
  foreignKey: 'user_id',
  as: 'postComment',
});
Content.belongsToMany(Users, {
  through: 'Content_Users',
  foreignKey: 'content_id',
  as: 'user',
});

Users.belongsToMany(Subredidit, {
  through: 'Subredidit_Users',
  foreignKey: 'user_id',
  as: 'subredidit',
});

Subredidit.belongsToMany(Users, {
  through: 'Subredidit_Users',
  foreignKey: 'subredidit_id',
  as: 'user',
});

Content_Users.sync()
  .then(() => console.log("Content_Users has been sync'd"))
  .catch(err => console.log('Error on JoinTable: ', err));

Subredidit_Users.sync()
  .then(() => console.log("Subredidit_Users has been sync'd"))
  .catch(err => console.log('Error on JoinTable: ', err));

module.exports = { Content_Users, Subredidit_Users };
