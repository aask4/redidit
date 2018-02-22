const Subredidit = require('./subrediditSchema');

const deleteSub = (subrediditName, callback) => {
  Subredidit.destroy({where: {name: subrediditName}})
    .then( result => console.log('deleteSub deleted: ', result))
    .catch( err => console.log('deleteSub error: ', err));
};

const findSub = (subrediditName, callback) => {
  Subredidit.findAll({where: {name: subrediditName}})
    .then( result => console.log('findSub result: ', result))
    .catch( err => console.log('findSub error: ', err));
};

const saveSub = (subrediditName, callback) => {
  let newSub = Subredidit.create({
    name: subrediditName
  });

  callback();
};

module.exports = {deleteSub, findSub, saveSub}