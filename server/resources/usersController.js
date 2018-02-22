const Users = require('../../db/models/usersModel');
// const Subredidits = require('../../db/models/subrediditModel');

module.exports.fetchUserProfile = (req, res) => {
  Users.findAll({ where: { username: req.query.username } })
    .then((user) => {
      res.end(JSON.stringify(user));
    })
    .catch((err) => res.end(err));
}

module.exports.fetchUserSubscription = (req, res) => {
  Users.findAll({ where: { username: req.query.username } })
    .then((user) => {
      res.end(JSON.stringify(user));
    })
    .catch((err) => res.end(err));
}

module.exports.createUserSubscription = (req, res) => {

}

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