export const addname = data => ({
  type: "TEST",
  payload: data
});

export const addActiveUser = user => ({
  type: "ACTIVE_USER",
  payload: user
});

export const selectUser = user => ({
  type: "SELECTED_USER",
  payload: user
});

export const addPosts = posts => {
  console.log("inside of action this is the post", posts);
  return {
    type: "CURRENT_POSTS",
    payload: posts
  };
};

export const addActiveSubredidit = subredidit => ({
  type: "ACTIVE_SUBREDIDIT",
  payload: subredidit
});

export const loadAllSubredidit = subredidit => ({
  type: "ALL_SUBREDIDIT",
  payload: subredidit
});

export const loadUserSubredidit = subredidit => ({
  type: "USER_SUBREDIDIT",
  payload: subredidit
});
