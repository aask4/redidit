import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Nav from './Nav.jsx';
import Search from './Search.jsx';
import ContentList from './ContentList.jsx';
import SubscribeButton from './SubscribeButton';
import Subscriptions from './Subscriptions';

class Main extends Component {
  render() {
    return (
      <div>
        <div>
          <Subscriptions />
        </div>
        <div>{/* <Nav /> can add hot + new as needed */}</div>
        <div>{/* user options on right including logout */}</div>
        <div>
          {this.props.active_user && (
            <Link to="/post">
              <input type="submit" value="Create Post" />
            </Link>
          )}
          <br />
          <br />
        </div>
        <h3>{(this.props.active_subredidit && this.props.active_subredidit.name) || 'All'}</h3>
        <br />
        <br />
        <div className="sidebar">
          <SubscribeButton />
          <Search />
        </div>
        <div>
          <ContentList />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    active_user: state.active_user,
    active_subredidit: state.active_subredidit,
  };
}

export default connect(mapStateToProps)(Main);
