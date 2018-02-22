import React, { Component } from 'react'

class Login extends Component {

  render() {
    return (
      <div>
        Username:
        <input type='username'id='username'/>
        Password:
        <input type='password' id='password'/>
        <button>login</button>
      </div>
    )
  }
}

export default Login

