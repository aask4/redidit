export default (state = null, action) => {
  switch (action.type) {
    case 'CURRENT_COMMENTS':
      return action.payload;
      break;
  }
  return state;
};
