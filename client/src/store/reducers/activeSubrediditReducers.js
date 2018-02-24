export default (state = null, action) => {
  switch (action.type) {
    case 'ACTIVE_SUBREDIDIT':
      return action.payload;
      break;
  }
  return state;
};
