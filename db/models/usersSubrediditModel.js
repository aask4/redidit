const {db, Sequelize} = require('../index');

const UsersSubredidits = db.define('users_subredidits', {
  users_id: Sequelize.INTEGER,
  subredidits_id: Sequelize.INTEGER
})

UsersSubredidits.sync()
  .then( () => console.log('Users_Subredidits Table synced!'))
  .catch( err => console.log('Error: ', err));

module.exports = UsersSubredidits;
