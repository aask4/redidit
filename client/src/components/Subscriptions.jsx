import React from 'react';
import axios from 'axios';

class Subscriptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSubscriptions: [],
    };
  }

  componentDidMount() {
    axios
      .get('/userprofile/subscription', { params: { user_id: 1 } }) // what param should we send here?
      .then(({ data }) => {
        console.log('Subscription data: ', data);
      })
      .catch(err => console.log('fetchSubsription Error: ', err));
  }

  render() {
    return <div>Display user subscriptions here</div>;
  }
}

function mapStateToProps(state) {
  return {
    active_user: state.active_user,
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addActiveUser,
    },
    dispatch,
  );
}
export default connect(mapStateToProps, matchDispatchToProps)(StatusBar);
