import content from '../../db/contentHelper'

const retreiveContent = (req, res) => {
  // req.body requires post _id

};

const createContent = (req, res) => {
  // req.body requires owner's username or _id, 
  // content URL, and timestamp 

};

export {retreiveContent, createContent};