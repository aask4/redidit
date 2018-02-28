const Content = require('../models/contentModel');

module.exports.postContent = (contentObj, callback) => {
  console.log(contentObj);
  Content.create({
    title: contentObj.title,
    owner: contentObj.owner,
    content: contentObj.content,
    score: 0,
    parent: contentObj.parent,
    type: contentObj.type,
    subredidit: contentObj.subredidit,
  })
    .then((result) => {
      console.log('Saved to database: ', result.dataValues);
      callback(result);
    })
    .catch(err => console.log('Error in postContent: ', err));
};

module.exports.getContent = (queryObj, callback) => {
  const limit = queryObj.limit || 100;
  Content.findAll({
    where: JSON.parse(queryObj.where),
    order: [['createdAt', 'DESC']],
    limit,
  })
    .then(result => callback(result))
    .catch(err => console.log('Error in getContent: ', err));
};

module.exports.updateContent = (contentObj, callback) => {
  Content.update({ score: contentObj.score }, { where: { id: contentObj.id }, returning: true })
    .then((result) => {
      callback({ score: result[1][0].dataValues.score });
    })
    .catch(err => console.log('Error in updateContent: ', err));
};

module.exports;
