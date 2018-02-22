import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
class Nav extends Component {
    constructor(props) {
        super(props)
    }
    best() {
      console.log('run', this.props.history)
      this.props.history.push('/posts')
    }
    render() {
        return (
          <div>
            <button onClick={() => this.best()}>Posts Page</button>
            <button onClick={()=> this.props.history.push('/main')}>Main Page</button>
            <button onClick={()=> this.props.history.push('/login')}>Login Page</button>
          </div>
        )
    }
}
export default Nav
