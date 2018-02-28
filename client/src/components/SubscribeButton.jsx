import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadUserSubredidit } from "../actions/index";
import axios from "axios";

class SubscribeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleButton: false //
    };
  }

  componentWillReceiveProps() {
    setTimeout(() => {
      console.log("SubscribeButton PropsComponent: ", this.props);
      if (
        this.props.active_subredidit &&
        this.props.active_user &&
        this.props.active_user_subredidit
      ) {
        let result = false;
        this.props.active_user_subredidit.forEach(sub => {
          if (sub.name === this.props.active_subredidit.name) {
            result = true;
          }
        });
        return this.setState({ toggleButton: result });
      }
    }, 0);
  }

  handleSubscription(e) {
    const command = e.target.name;
    const action = {
      delete: () => {
        axios
          .delete("/subscription", {
            params: {
              user_id: this.props.active_user.id,
              subredidit_id: this.props.active_subredidit.id
            }
          })
          .then(({ data }) => {
            this.setState({ toggleButton: !this.state.toggleButton });

            let updateSubscription = this.props.active_user_subredidit;
            updateSubscription.forEach((sub, index) => {
              if (sub.id === this.props.active_subredidit.id) {
                updateSubscription.splice(index, 1);
              }
            });
            this.props.loadUserSubredidit(updateSubscription);
          })
          .catch(err => {
            console.log(err);
          });
      },
      post: () => {
        axios
          .post("/subscription", {
            user_id: this.props.active_user.id,
            subredidit_id: this.props.active_subredidit.id
          })
          .then(({ data }) => {
            console.log("SubscribeButton post data: ", data);
            this.setState({ toggleButton: !this.state.toggleButton });
            let updateSubscription = [
              ...this.props.active_user_subredidit,
              this.props.active_subredidit
            ];
            this.props.loadUserSubredidit(updateSubscription);
          })
          .catch(err => {
            console.log(err);
          });
      }
    };

    if (this.props.active_user && this.props.active_subredidit) {
      action[command]();
    } else {
      // user is not signed in, prompt to signup
      console.log("user is not signed in or there is no active subreditit");
    }
  }

  render() {
    return (
      <div>
        {this.props.active_subredidit && this.props.active_user ? (
          <div className="subscribe">
            <p>{this.props.active_subredidit.name}</p>
            {this.state.toggleButton ? (
              <button
                name="delete"
                type="button"
                onClick={e => this.handleSubscription(e)}
              >
                Unsubscribe
              </button>
            ) : (
              <button
                name="post"
                type="button"
                onClick={e => this.handleSubscription(e)}
              >
                Subscribe
              </button>
            )}
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    active_user: state.active_user,
    active_user_subredidit: state.active_user_subredidit,
    active_subredidit: state.active_subredidit
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loadUserSubredidit
    },
    dispatch
  );
}
export default connect(mapStateToProps, matchDispatchToProps)(SubscribeButton);
