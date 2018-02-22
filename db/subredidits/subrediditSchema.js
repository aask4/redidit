const {db, Sequelize} = require('../index');

const Subredidit = db.define({ 'subredidits',
  name: Sequelize.STRING
})

Subredidit.sync()
  .then( () => console.log('Subredidit Table created!'))
  .catch( err => console.log('Error: ', err));

module.exports = Subredidit;
