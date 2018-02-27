const content = require("../../db/helpers/contentHelpers");
const Votes = require("../../db/models/votesModel");

module.exports.retreiveContent = (req, res) => {
  // req.body requires content _id or query object
  content.getContent(req.query, result => {
    res.send(result);
  });
};

module.exports.createContent = (req, res) => {
  // req.body requires owner's username or _id,
  // content URL, and timestamp
  console.log(req.body);
  content.postContent(
    {
      title: req.body.title,
      owner: req.body.user.username,
      content: req.body.content,
      parent: req.body.parent || 0,
      type: req.body.type,
      subredidit: req.body.subredidit
    },
    result => {
      Votes.create({
        user_id: req.body.user.id,
        content_id: result.id,
        votes_count: 0
      })
        .then(result => console.log("created votes for content: ", result))
        .catch(err => console.log("Create Votes error: ", err));
      res.send(result);
    }
  );
};

module.exports.updateContent = (req, res) => {
  // req.body requires content id and +/- 1
  console.log("** contentController >> updateContent **");
  content.updateContent(
    { score: req.body.score, id: req.body.content_id },
    result => {
      console.log("REQ>BODY<USER_ID", req.body);
      console.log(result);
      Votes.update(
        { votes_count: req.body.score },
        { where: { content_id: req.body.content_id } }
      )
        .then(result => console.log("Should send updated vote count: ", result))
        .catch(err =>
          console.log("error occurered when updating votes: ", err)
        );
      res.send(result);
    }
  );
};

// Votes functions*****************************

// module.exports.createVotes = (req, res, next) => {
//   // everytime a comment/post is created, should invoke this function
//   // we should add this to create content
//   const newVote = Votes.create({
//     user_id: req.body.user_id,
//     content_id: req.body.content_id,
//     votes_count: 0,
//   })
//     .then(result => console.log('created votes for content: ', result))
//     .catch(err => console.log('Create Votes error: ', err));
// };

// GET
module.exports.getVotes = (req, res, callback) => {
  // when content is loaded, should invoke this function
  Votes.findAll({
    where: { user_id: req.body.user_id, content_id: req.body.content_id }
  })
    .then(result => callback(result))
    .catch(err => console.log("Error occured while getting votes", err));
};

// // PUT
// module.exports.updateVotes = (req, res) => {
//   // when voting button clicked, should invoke this function
//   Votes.update(
//     { votes_count: req.body.votes_count },
//     { where: { user_id: req.body.user_id, content_id: req.body.content_id } },
//   )
//     .then(result => console.log('Should send updated vote count: ', result))
//     .catch(err => console.log('error occurered when updating votes: ', err));
// };
