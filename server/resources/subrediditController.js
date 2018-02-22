const { deleteSub, findSub, saveSub } = require('../../db/models/subrediditHelpers');

exports.retrieveSubredidit = (req, res) => {
  findSub(req.query.subrediditName, (result) => {
    result === 'error' || result.length > 0
      ? res.status(200).send(result)
      : res.status(201).send('Not Found.  You should create one');
  });
};

exports.createSubredidit = (req, res) => {
  // takes in post object
  saveSub(req.body.subrediditName, (result) => {
    result === 'success' // returns a string - we can update this to id later
      ? res.status(201).send('new subredidit created!')
      : res.status(201).send('Subredidit Already exists');
  });
};
