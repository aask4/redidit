export const addname = data => ({
  type: 'TEST',
  payload: data,
});

export const addActiveUser = user => ({
  type: 'ACTIVE_USER',
  payload: user,
});

export const selectUser = user => ({
  type: 'SELECTED_USER',
  payload: user,
});

export const addPosts = posts => ({
  type: 'CURRENT_POSTS',
  payload: posts,
});

export const addComments = comment => ({
  type: 'CURRENT_COMMENTS',
  payload: comment,
});
