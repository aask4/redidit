const {db, Sequelize} = require('../index');

const Subredidit = db.define({ 'subredidits',
  name: {type: Sequelize.STRING, unique: true}
})

Subredidit.sync()
  .then( () => console.log('Subredidit Table synced!'))
  .catch( err => console.log('Error: ', err));

module.exports = Subredidit;
