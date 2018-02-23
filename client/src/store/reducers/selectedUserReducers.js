export default (state = null, action) => {
  switch (action.type) {
    case 'SELECTED_USER':
      return action.payload;
      break;
  }
  return state;
};
