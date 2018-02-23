import Axios from 'axios';

export default function (queryObj) {
<<<<<<< HEAD
  queryObj.type = queryObj.type || 'post';
  let data;
  Axios.get('/content', {
      params: queryObj
    })
=======
  let data;
  Axios.get('/content', queryObj)
>>>>>>> 25c1c8c7e8e9c52fe7c90123d72eb1ad35983d06
    .then((result) => data = result)
    .catch((err) => console.log('Error in contentReducer.get: ', err));
  return data;
}
