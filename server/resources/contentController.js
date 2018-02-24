const content = require('../../db/helpers/contentHelpers');
const Votes = require('../../db/models/votesModel');

module.exports.retreiveContent = (req, res) => {
  // req.body requires content _id or query object
  content.getContent(req.query, (result) => {
    console.log('retreived content from databse', result);
    res.send(result);
  });
};

module.exports.createContent = (req, res) => {
  // req.body requires owner's username or _id,
  // content URL, and timestamp
  content.postContent(
    {
      owner: req.body.owner,
      content: req.body.content,
      parent: req.body.parent || 0,
      type: req.body.type,
      subredidit: req.body.subredidit,
    },
    result => res.send(result),
  );
};

// Votes functions*****************************

module.exports.createVotes = (req, res) => {
  // everytime a comment/post is created, should invoke this function
  // we should add this to create content
  const newVote = Votes.create({
    user_id: req.body.user_id,
    content_id: req.body.content_id,
    votes_count: 0,
  })
    .then(result => console.log('created votes for content: ', result))
    .catch(err => console.log('Create Votes error: ', err));
};

// GET
module.exports.getVotes = (req, res) => {
  // when content is loaded, should invoke this function
  Votes.findAll({ where: { user_id: req.body.user_id, content_id: req.body.content_id } })
    .then(result => console.log('GET for Votes: ', result))
    .catch(err => console.log('Error occured while getting votes', err));
};

// PUT
module.exports.updateVotes = (req, res) => {
  // when voting button clicked, should invoke this function
  Votes.update(
    { votes_count: req.body.votes_count },
    { where: { user_id: req.body.user_id, content_id: req.body.content_id } },
  )
    .then(result => console.log('Should send updated vote count: ', result))
    .catch(err => console.log('error occurered when updating votes: ', err));
};
