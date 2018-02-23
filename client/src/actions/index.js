export const addname = data => ({
  type: 'TEST',
  payload: data,
});

export const addActiveUser = user => ({
  type: 'ACTIVE_USER',
  payload: user,
});

export const addPosts = posts => ({
  type: 'CURRENT_POSTS',
  payload: posts,
});
