const { db, Sequelize } = require('../index');

const Votes = db.define('votes', {
  user_id: Sequelize.INTEGER,
  content_id: Sequelize.INTEGER,
  votes_count: Sequelize.INTEGER,
});

Votes.sync()
  .then(() => console.log('Votes table created'))
  .catch(err => console.error(err));

module.exports = Votes;
