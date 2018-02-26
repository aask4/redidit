import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class SubscribeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleButton: false, //
    };
  }

  componentDidMount() {
    if (this.props.active_user) {
      let params = {
        users_id: this.props.active_user.id
      }

      axios.get('/userprofile/subscription', params)
        .then(({data}) => {
          if (//subscriptions exists) {
            this.setState({toggleButton: true})
          }
        })
        .catch( err => console.log('subscribeButton check error: ', err));


    }
  }

  handleSubscription() {
    const command = e.target.ref;
    const action = {
      delete: () => {
        axios
          .delete('/userprofile/subscription', {
            // fetch current subreditit ID from store
            // send with active user ID from store
          })
          .then(({ data }) => {
            this.setState({ toggleButton: !this.state.toggleButton });
          })
          .catch((err) => {
            console.log(err);
          });
      },
      post: () => {
        axios
          .post('/userprofile/subscription', {
            // fetch current subreditit ID from store
            // send with current user ID
          })
          .then(({ data }) => {
            this.setState({ toggleButton: !this.state.toggleButton });
          })
          .catch((err) => {
            console.log(err);
          });
      },
    };

    // if (user is signed in) {
    //   action[command]();
    // } else {
    //   user is not signed in, prompt to signup
    // }
  }

  render() {
    return (
      <div className="subscribe">
        {this.state.toggleButton ? (
          <button ref="delete" type="button" onClick={() => this.handleSubscription()}>
            Unsubscribe
          </button>
        ) : (
          <button ref="post" type="button" onClick={() => this.handleSubscription()}>
            Subscribe
          </button>
        )}
        insert subredidit name
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    active_user: state.active_user,
    active_subredidit: state.active_subredidit,
  };
}
// do i need a dispatch?

export default connect(mapStateToProps)(SubscribeButton);
