const Users = require("../../db/models/usersModel");
const bcrypt = require("bcrypt");
const Subredidit = require("../../db/models/subrediditModel");

module.exports.createUser = (req, res) => {
  console.log("just recieved a signup request", req.body);
  Users.findAll({ where: { username: req.body.username } })
    .then(user => {
      if (user.length) {
        res.send({ username: false });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          const userInfo = {
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
      console.log("error query user", `${err}`);
    });
};
include: [
  {
    model: Subredidit,
    as: "subredidit"
  }
],
  (module.exports.login = (req, res) => {
    console.log("recieve a login request", req.query);
    Users.findOne({
      where: { email: req.query.email },
      include: [
        {
          model: Subredidit,
          as: "subredidit"
        }
      ]
    })
      .then(user => {
        if (user) {
          bcrypt.compare(req.query.password, user.password, (err, match) => {
            if (match) {
              res.send(user);
            } else {
              res.send({ error: "password does not match" });
            }
          });
        } else {
          res.send({ error: "username not found" });
        }
      })
      .catch(err => {
        console.log("having error fing the user", `${err}`);
      });
  });

module.exports.authentication = (req, res) => {
  console.log(
    "just recieved a authentication request this is the req.query",
    req.query
  );
  Users.findOne({ where: { email: req.query.email } })
    .then(user => {
      console.log("find a user", user);
      res.json(user);
    })
    .catch(err => console.log("problem fetching users info", err));
};
