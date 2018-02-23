const Users = require("../../db/models/usersModel");
const bcrypt = require("bcrypt");
// const Subredidits = require('../../db/models/subrediditModel');
// const UsersSubredidits = require('../../db/models/usersSubrediditModel');

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

  //TODO: please update parameters
  // UsersSubredidits.destroy({where: {users_id: userID, subredidits_id: subredidits_id}})
  // .then( result => res.status(200).send(result))
  // .catch( err => res.status(200).send('Error'))
}

module.exports.createUser = (req, res) => {
  console.log("just recieved a signup request", req.body);
  Users.findAll({ where: { username: req.body.username } })
    .then(user => {
      if (user.length) {
        res.send({ username: false });
      } else {
        bcrypt.hash(req.body.password, 10, function(err, hash) {
          let userInfo = {
            email: req.body.email,
            username: req.body.username,
            password: hash
          };
          Users.create(userInfo)
            .then(user => {
              console.log("just added a user to db", user);
              res.send(user);
            })
            .catch(err => {
              console.log("having error creating user", err);
            });
        });
      }
    })
    .catch(err => {
      console.log("error query user", err);
    });
};

module.exports.login = (req, res) => {
  console.log("recieve a login request", req.query);
  Users.findAll({ where: { username: req.query.username } })
    .then(user => {
      console.log("found the user", user);
      if (user.length) {
        bcrypt.compare(req.query.password, user[0].password, function(
          err,
          match
        ) {
          if (match) {
            res.send(user[0]);
          } else {
            res.send({ error: "password does not match" });
          }
        });
      } else {
        res.send({ error: "username not found" });
      }
    })
    .catch(err => {
      console.log("having error fing the user", err);
    });
};
