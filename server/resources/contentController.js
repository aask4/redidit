const content = require('../../db/helpers/contentHelpers');

module.exports.retreiveContent = (req, res) => {
  // req.body requires content _id or query object
  content.getContent(req.query, (result) => {
    console.log('retreived content from databse');
    res.send(result);
  });
};

module.exports.createContent = (req, res) => {
  // req.body requires owner's username or _id,
  // content URL, and timestamp
  console.log('REQ.BODY in Controller createContent: ', req.body);
  content.postContent(
    {
      owner: req.body.owner,
      content: req.body.content,
      parent: req.body.parent || 0,
      type: req.body.type,
    },
    result => res.send(result),
  );
};
