const Subredidit = require('../../db/models/subrediditModel');

exports.retrieveSubredidit = (req, res) => {
  Subredidit.findAll({ where: { name: req.query.subrediditName } })
    .then((result) => {
      result === 'error' || result.length > 0
        ? res.status(200).send(result) &&
          console.log('Now do Content search for: ', result[0].dataValues.id)
        : res.status(201).send('404');
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
      res.status(201).send(result);
    })
    .catch(err => res.status(201).send('404'));
};
