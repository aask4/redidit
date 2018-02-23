import { combineReducers } from 'redux';
import test from './testReducers';
import active_user from './activeUserReducers';
import current_posts from './currentPostsReducer';

export default combineReducers({
  test,
  active_user,
  current_posts,
});
