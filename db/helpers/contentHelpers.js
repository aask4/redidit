const Content = require('../models/contentModel');

module.exports.postContent = (contentObj, callback) => {
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
      callback(result);
    })
    .catch(err => console.log('Error in postContent: ', err));
};

module.exports.getContent = (queryObj, callback) => {
  // set limit and sort order if none specified
  const limit = queryObj.limit || 25;
  const order = (queryObj.order) ? [JSON.parse(queryObj.order)] : [['createdAt', 'DESC']];
  const where = JSON.parse(queryObj.where);
  queryObj.where.subredidit = queryObj.where.subredidit || undefined;

  Content.findAll({
    where,
    order,
    limit,
  })
    .then(result => callback(result))
    .catch(err => console.log('Error in getContent: ', err));
};

module.exports.updateContent = (contentObj, callback) => {
  // only a content item's score can change
  Content.update({ score: contentObj.score }, { where: { id: contentObj.id }, returning: true })
    .then((result) => {
      callback({ score: result[1][0].dataValues.score });
    })
    .catch(err => console.log('Error in updateContent: ', err));
};

module.exports;
