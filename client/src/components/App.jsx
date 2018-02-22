import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addname } from '../actions'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Main from './Main'
import Posts from './Posts.jsx'
import Nav from './Nav.jsx'
class App extends React.Component {
  constructor() {
    super()
}
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
          <Switch>
            <Route path="/" component={Nav}/>  
          </Switch>
          <Switch>
            <Route path="/" component={Main}/>
            <Route path="/posts" component={Posts}/>
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
