export default (state = null, action) => {
  switch (action.type) {
    case 'ALL_SUBREDIDIT':
      return action.payload;
      break;
  }
  return state;
};
