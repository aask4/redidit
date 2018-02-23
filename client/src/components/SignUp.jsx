import React, { Component } from 'react'

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      username: '',
      password: ''
    }
  }
  render() {
    return(
      <div>
        {
          this.state.email ? 
          <div>
          Username :<input id='un' type='text'/><br/>
          Password :<input id='pw' type="password"/><br/>
          <button>Submit</button>
          </div>
          :
          <div>
          Email: <input type='email'/>
          </div>
        }
      </div>
    )
  }
}

export default SignUp