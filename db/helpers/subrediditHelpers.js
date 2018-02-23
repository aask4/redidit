// const Subredidit = require('../models/subrediditModel');
// const Subredidit = require('../models/subrediditModel');

// const deleteSub = (subrediditName, callback) => {
//   Subredidit.destroy({where: {name: subrediditName}})
//     .then( result => callback(result))
//     .catch( err => callback('error'));
// };

// const findSub = (subrediditName, callback) => {

//   Subredidit.findAll({where: {name: subrediditName}})
//     .then( result => callback(result))
//     .catch( err => callback('error'));
// };

// const saveSub = (subrediditName, callback) => {
//   let newSub = Subredidit.create({
//     name: subrediditName,
//     visits: 0
//   })
//   .then( result => callback('success'))
//   .catch( err => callback('error'));
// };

// module.exports = {deleteSub, findSub, saveSub}
