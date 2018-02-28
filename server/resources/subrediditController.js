const Subredidit = require('../../db/models/subrediditModel');

exports.retrieveSubredidit = (req, res) => {
  if (req.query.name) {
    Subredidit.findAll({ where: req.query })
      .then((result) => {
        return (result === 'error' || result.length > 0) ?
          res.status(200).send(result[0]) :
          res.status(201).send('404');
      })
      .catch(err => res.status(404).send('Error'));
  } else {
    Subredidit.findAll()
      .then((result) => {
        result === 'error' || result.length > 0
          ? res.status(200).send(result)
          : res.status(201).send(result);
      })
      .catch(err => res.status(404).send('Error'));
  }
};

exports.createSubredidit = (req, res) => {
  // takes in post object
  const newSub = Subredidit.create({
    name: req.body.subrediditName,
    visits: 0,
  })
    .then((result) => {
      res.status(201).send(result.dataValues);
    })
    .catch(err => res.status(201).send('404'));
};
