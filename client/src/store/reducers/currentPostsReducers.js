const dummy = {
  owner: 0,
  content: 'XXX',
  parent: 0,
  type: 'post',
  timestamp: '00.00',
  score: -1,
};

export default (state = null, action) => {
  switch (action.type) {
    case 'CURRENT_POSTS':
      return action.payload;
      break;
  }
  return state;
};
