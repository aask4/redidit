import Content from './contentSchema';

export const postContent = (contentObj, callback) => {
  Content.create({
    owner: contentObj.owner,
    content: contentObj.content,
    score: 0,
    parent: contentObj.parent
  })
    .then((result) => console.log('Saved to database: ', result))
    .catch((err) => console.log('Error in postContent: ', err))
};

export const getContent = (queryObj, callback) => {
  Content.findAll({where: queryObj})
    .then((result) => callback(result))
    .catch((err) => console.log('Error in getContent: ', err));
};

export const updateContent = (contentObj, callback) => {
  Content.update({score: contentObj.score}, {where: {id: contentObj.id}})
    .then((result) => console.log('Content updated.'))
    .catch((err) => console.log('Error in updateContent: ', err));
};
