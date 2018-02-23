const Content =require('./contentModel');

module.exports.postContent = (contentObj, callback) => {
  console.log(contentObj);
  Content.create({
    owner: contentObj.owner,
    content: contentObj.content,
    score: 0,
    parent: contentObj.parent,
    type: contentObj.type
  })
    .then((result) => {
      console.log('Saved to database: ', result);
      callback(result);
    })
    .catch((err) => console.log('Error in postContent: ', err))
};

module.exports.getContent = (queryObj, callback) => {
  Content.findAll({where: queryObj})
    .then((result) => callback(result))
    .catch((err) => console.log('Error in getContent: ', err));
};

module.exports.updateContent = (contentObj, callback) => {
  Content.update({score: contentObj.score}, {where: {id: contentObj.id}})
    .then((result) => console.log('Content updated.'))
    .catch((err) => console.log('Error in updateContent: ', err));
};

module.exports
