import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import { addActiveUser } from "../actions";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  handleLoginButtonClick() {
    console.log("button clicked", this.state);
    this.props.addActiveUser("shayne");
    // axios.get('api/login'), {params: this.state}
    //   .then(res=> {
    //       this.props.addActiveUser(res.data[0])
    //   })
    //   .catch(err=>{console.log('Error doing get request on login',err)})
  }
  onchangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    return (
      <div style={{ float: "right" }}>
        <input
          name="username"
          type="text"
          id="username"
          placeholder="Username"
          onChange={e => this.onchangeHandler(e)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={e => this.onchangeHandler(e)}
          required
        />
        <br />
        <button
          style={{ float: "right" }}
          onClick={() => this.handleLoginButtonClick()}
        >
          login
        </button>
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

export default connect(mapStateToProps, matchDispatchToProps)(Login);
