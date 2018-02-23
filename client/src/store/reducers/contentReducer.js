import Axios from 'axios';

export default function (queryObj) {
  let data;
  Axios.get('/content', queryObj)
    .then((result) => data = result)
    .catch((err) => console.log('Error in contentReducer.get: ', err));
  return data;
}
