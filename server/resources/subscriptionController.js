const Users = require('../../db/models/usersModel');
const Subredidit = require('../../db/models/subrediditModel');
const { Subredidit_Users } = require('../../db/models/joinTableModels');

module.exports.fetchUserSubscription = (req, res) => {
  Users.findAll({
    where: { username: req.query.username },
    include: [
      {
        model: Subredidit,
        as: 'subredidit',
      },
    ],
  }).then((result) => {
    res.status(200).send(result[0]);
  });
};

module.exports.createUserSubscription = (req, res) => {
  Subredidit_Users.create({
    user_id: req.body.user_id,
    subredidit_id: req.body.subredidit_id,
  })
    .then(result => res.status(201).send(result))
    .catch(err => res.status(201).send(`${err}`));
};

module.exports.deleteUserSubscription = (req, res) => {
  Subredidit_Users.destroy({
    where: { user_id: req.query.user_id, subredidit_id: req.query.subredidit_id },
  })
    .then((result) => {
      res.status(200).send('success');
    })
    .catch((err) => {
      res.status(200).send(`${err}`);
    });
};
