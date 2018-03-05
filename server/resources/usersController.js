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
              // res.send(user);
              res.json(200, user);
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

module.exports.login = (req, res) => {
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
            res.json(200, user);
          } else {
            res.json(403, { error: "password does not match" });
          }
        });
      } else {
        res.json(403, { error: "username not found" });
      }
    })
    .catch(err => {
      console.log("having error fing the user", `${err}`);
    });
};

module.exports.authentication = (req, res) => {
  console.log(
    "just recieved a authentication request this is the req.query",
    req.query
  );
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
        res.json(200, user);
      } else {
        res.json(403, { success: false, message: "email not found" });
      }
    })
    .catch(err => console.log("problem fetching users info", err));
};
