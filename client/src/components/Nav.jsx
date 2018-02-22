import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
class Nav extends Component {
    constructor(props) {
        super(props)
    }
    best() {
      console.log('button clicked')
    }
    render() {
        return (
            <button onClick={() => this.best()}>Posts</button>
        )
    }
}
export default Nav
