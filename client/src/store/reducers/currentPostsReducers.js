export default (state = null, action) => {
  switch (action.type) {
    case "CURRENT_POSTS":
      return action.payload;
      break;
  }
  return state;
};
