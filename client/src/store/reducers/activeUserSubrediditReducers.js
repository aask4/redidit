export default (state = null, action) => {
  switch (action.type) {
    case "USER_SUBREDIDIT":
      return action.payload;
      break;
  }
  return state;
};
