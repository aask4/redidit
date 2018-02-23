import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import StatusBar from './StatusBar'

class Nav extends Component {
    constructor(props) {
        super(props)
    }
    best() {
      console.log('run', this.props.history)
      this.props.history.push('/signup')
    }
    render() {
        return (
          <div>
            {/* <button onClick={() => this.best()}>Posts Page</button>
            <button onClick={()=> this.props.history.push('/main')}>Main Page</button>
            <button onClick={()=> this.props.history.push('/login')}>Login Page</button> */}
            {/* {
              this.props.active_user ?
              <div>
                user not sign in yet
              </div>
              :
              <div>

              </div>
            } */}
            <StatusBar />
          </div>
        )
    }
}
function mapStateToProps(state) {
  return {
    active_user: state.active_user
  }
}
export default connect(mapStateToProps)(Nav)
