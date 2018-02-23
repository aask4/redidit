import React, { Component } from 'react'
import { connect } from 'react-redux'
import SignUp from './SignUp'
class StatusBar extends Component {
  constructor(props) {
    super(props)
  }
  signupClick() {
    console.log('button clicked', this.props)
    // this.props.history.push('/signup')
  }
  render() {
    return(
      <div style={{float:'right'}}>
        {
          this.props.active_user ?
          <div>
            Current User 
            <button>logout</button>
          </div>
          :
          <div>
            wants to join in ? <span onClick={() => this.signupClick()}><strong>sign up</strong></span> in a seconds
          </div>
        }
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    active_user: state.active_user
  }
}

export default connect(mapStateToProps)(StatusBar)