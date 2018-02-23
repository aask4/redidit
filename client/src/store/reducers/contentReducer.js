import Axios from 'axios';

export default function (queryObj) {
  queryObj.type = queryObj.type || 'post';
  let data;
  Axios.get('/content', queryObj)
    .then((result) => data = result)
    .catch((err) => console.log('Error in contentReducer.get: ', err));
  return data;
}
