import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addActiveUser } from "../actions";
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      submitEmail: false
    };
  }
  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit() {
    console.log(this.props.history.push("/"));
    this.props.addActiveUser("shayne");
  }
  render() {
    return (
      <div>
        {this.state.submitEmail ? (
          <div>
            Username :<input
              type="text"
              name="username"
              onChange={e => this.handleInput(e)}
            />
            <br />
            Password :<input
              type="password"
              name="password"
              onChange={e => this.handleInput(e)}
            />
            <br />
            <button onClick={() => this.handleSubmit()}>Submit</button>
          </div>
        ) : (
          <div>
            Email:<br />
            <input name="email" onChange={e => this.handleInput(e)} />
            <button
              onClick={() => {
                this.setState({ submitEmail: true }),
                  console.log("email submit button click", this.state);
              }}
            >
              submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    active_user: state.active_user
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addActiveUser: addActiveUser
    },
    dispatch
  );
}

export default connect(mapStateToProps, matchDispatchToProps)(SignUp);
