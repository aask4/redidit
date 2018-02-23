const Subredidit = require('../../db/models/subrediditModel');
const { deleteSub, findSub, saveSub } = require('../../db/helpers/subrediditHelpers');

exports.retrieveSubredidit = (req, res) => {
  Subredidit.findAll({ where: { name: req.query.subrediditName } })
    .then((result) => {
      result === 'error' || result.length > 0
        ? res.status(200).send(result)
        : res.status(201).send('Not Found.  You should create one');
    })
    .catch(err => res.status(404).send('Error'));
};

exports.createSubredidit = (req, res) => {
  // takes in post object
  const newSub = Subredidit.create({
    name: req.body.subrediditName,
    visits: 0,
  })
    .then((result) => {
      res.status(201).send('new subredidit created!'); // returns a string - we can update this to id later
    })
    .catch(err => res.status(201).send('Subredidit Already exists'));
};
