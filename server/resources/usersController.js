const Users = require("../../db/models/usersModel");
// const Subredidits = require('../../db/models/subrediditModel');
<<<<<<< HEAD
const UsersSubredidits = require("../../db/models/usersSubrediditModel");
=======
// const UsersSubredidits = require('../../db/models/usersSubrediditModel');
>>>>>>> 90bb515886dcc4acf95d2bd1989325da5fa839eb

module.exports.fetchUserProfile = (req, res) => {
  Users.findAll({ where: { username: req.query.username } })
    .then(user => {
      res.end(JSON.stringify(user));
    })
    .catch(err => res.end(err));
};

module.exports.fetchUserSubscription = (req, res) => {
  Users.findAll({ where: { username: req.query.username } })
    .then(user => {
      res.end(JSON.stringify(user));
    })
    .catch(err => res.end(err));

  //Not sure if you need this
  // UsersSubredidits.findAll({where: {users_id: userID, subredidits_id: subredidits_id}})
  //   .then( result => res.status(200).send(result))
  //   .catch( err => res.status(200).send('Error'))
<<<<<<< HEAD
};

module.exports.createUserSubscription = (req, res) => {
  //TODO: please update parameters
  // let newSubscription = UsersSubredidits.create({
  //   users_id: userID,
  //   subredidits_id: subrediditID
  // })
  // .then( result => res.status(201).send('Added'))
  // .catch( err => res.status(201).send('Error'))
};

module.exports.deleteUserSubscription = (req, res) => {
=======
};

module.exports.createUserSubscription = (req, res) => {

  //TODO: please update parameters
  // let newSubscription = UsersSubredidits.create({
  //   users_id: userID,
  //   subredidits_id: subrediditID
  // })
  // .then( result => res.status(201).send('Added'))
  // .catch( err => res.status(201).send('Error'))
};

module.exports.deleteUserSubscription = (req, res) => {

>>>>>>> 90bb515886dcc4acf95d2bd1989325da5fa839eb
  //TODO: please update parameters
  // UsersSubredidits.destroy({where: {users_id: userID, subredidits_id: subredidits_id}})
  // .then( result => res.status(200).send(result))
  // .catch( err => res.status(200).send('Error'))
<<<<<<< HEAD
};
=======
}
>>>>>>> 90bb515886dcc4acf95d2bd1989325da5fa839eb

// module.exports.createUser = (req, res) => {
//   Users.create({
//     email: 'test@gmail.com',
//     username: 'john',
//     password: '1234'
//   })
//     .then((user) => {
//       console.log(user);
//       res.end();
//     })
//     .catch((err) => res.end(err));
// }
