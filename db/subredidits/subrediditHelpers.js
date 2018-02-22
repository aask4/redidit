const Subredidit = require('./subrediditSchema');

const saveSub = (subrediditName, callback) => {
  let newSub = Subredidit.create({
    name: subrediditName
  });
};

const findSub = (subrediditName, callback) => {
  Subredidit.findAll({where: {name: subrediditName}})
    .then( result => console.log('findSub result: ', result))
    .catch( err => console.log('findSub error: ', err));
};

const deleteSub = (subrediditName, callback) => {
  Subredidit.destroy({where: {name: subrediditName}})
    .then( result => console.log('deleteSub deleted: ', result))
    .catch( err => console.log('deleteSub error: ', err));
}