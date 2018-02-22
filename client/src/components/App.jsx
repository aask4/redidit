import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addname } from '../actions'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Main from './Main'
import Posts from './Posts.jsx'
import Nav from './Nav.jsx'
import Login from './Login.jsx'
class App extends React.Component {
  constructor() {
    super()
}
  render() {
    return (
      <div>
        hello from App
        <BrowserRouter>
          <div>
          <Switch>
            <Route path="/" component={Nav}/>  
          </Switch>
          <Switch>
            <Route path='/Login' component={Login}/>
            <Route path="/posts" component={Posts}/>
            <Route path="/main" component={Main}/>
          </Switch>
          </div>
        </BrowserRouter>
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
