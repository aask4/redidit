const Users = require('../../db/models/usersModel');
const bcrypt = require('bcrypt');

module.exports.fetchUserProfile = (req, res) => {
  Users.findAll({ where: { username: req.query.username } })
    .then((user) => {
      res.send(user);
    })
    .catch(err => res.end(`${err}`));
};

module.exports.createUser = (req, res) => {
  console.log('just recieved a signup request', req.body);
  Users.findAll({ where: { username: req.body.username } })
    .then((user) => {
      if (user.length) {
        res.send({ username: false });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          const userInfo = {
            email: req.body.email,
            username: req.body.username,
            password: hash,
          };
          Users.create(userInfo)
            .then((user) => {
              console.log('just added a user to db', user);
              res.send(user);
            })
            .catch((err) => {
              console.log('having error creating user', err);
            });
        });
      }
    })
    .catch((err) => {
      console.log('error query user', `${err}`);
    });
};

module.exports.login = (req, res) => {
  console.log('recieve a login request', req.query);
  Users.findAll({ where: { username: req.query.username } })
    .then((user) => {
      if (user.length) {
        bcrypt.compare(req.query.password, user[0].password, (err, match) => {
          if (match) {
            res.send(user[0]);
          } else {
            res.send({ error: 'password does not match' });
          }
        });
      } else {
        res.send({ error: 'username not found' });
      }
    })
    .catch((err) => {
      console.log('having error fing the user', `${err}`);
    });
};
