import { combineReducers } from 'redux';
import test from './testReducers';
import active_user from './activeUserReducers';
import selectedUser from './selectedUserReducers';
import current_posts from './currentPostsReducers';
import active_subredidit from './activeSubrediditReducers';

export default combineReducers({
  test,
  active_user,
  selectedUser,
  current_posts,
  active_subredidit,
});
