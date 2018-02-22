import database from './index';

const db = database.db;
const Sequelize = database.Sequelize;

const Content = db.define('Contents', { 
  owner: Sequalize.Number,
  content: Sequalize.String,
  score: Sequalize.Number,
  parent: Sequalize.Number
});

Content.sync().then(() => console.log('Content has been sync\'d'));

export default Content;
