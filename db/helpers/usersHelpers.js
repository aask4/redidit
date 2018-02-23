// const {Users} = require( '../models/usersModel');

// //save function
// Users.sync()
//   .then( () => Users.create({
//     username: 'Redit User',
//     password: 'redidit'
//   }))

// //returns all
//  Users.findAll({})
//   .then( data => console.log('FindAll: ', data))
//   .catch( err => console.log(err));

// // Returns all users that match criteria
// Users.findAll({ where: { id: 1 }})
//   .then( data => console.log('FindAll w/ params: ', data))
//   .catch( err => console.log(err));

// // updating
// Users.update({username: 'Dogs'}, {where: {id: 1}})
//   .then( () => console.log('Post updated'))
//   .catch( err => console.log('Error: ', err));

// // delete All {} or you can specify params
// Users.destroy({where: {}})
//   .then( () => console.log('Deleted Post'))
//   .catch( err => console.log('Error: ', err));

// export default Users;