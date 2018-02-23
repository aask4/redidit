const database = require('./index');

const db = database.db;
const Sequelize = database.Sequelize;

const Content = db.define('Contents', { 
  owner: Sequelize.Number,
  content: Sequelize.String,
  score: Sequelize.Number,
  parent: Sequelize.Number,
  type: Sequelize.String
});

Content.sync().then(() => console.log('Content has been sync\'d'));

module.exports.Content = Content;
