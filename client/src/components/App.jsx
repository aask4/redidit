import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addname } from '../actions'
import { BroswerRouter, Route, Switch } from 'react-router-dom'
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      test: ''
    }
  }
  click() {
    this.props.addname(document.getElementById('input').value)
  }
  render() {
    return (
      <div>
        Hello from App
        <input id='input'/>
        <button onClick={()=>this.click()}>submit</button>
        {
          this.props.test ?
          <div>
            {this.props.test}
          </div>
          :
          <div>
            this should disapear after you submit something
          </div>
        }
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    test: state.test
  }
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    addname: addname
  },dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(App);
