import Axios from 'axios';

export default function (contentId) {
  Axios.get('/content', {
    params: {
      _id: contentId
    }
  })
}
