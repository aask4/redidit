import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Nav from './Nav.jsx';
import Search from './Search.jsx';
import ContentList from './ContentList.jsx';
import SubscribeButton from './SubscribeButton';

class Main extends Component {
  render() {
    return (
      <div>
        Main: insert subredit name here
        <div>{/* <Nav /> can add hot + new as needed */}</div>
        <div>{/* user options on right including logout */}</div>
        <div>
          <Link to="/post">
            <input type="submit" value="Create Post" />
          </Link>
          <br />
          <br />
        </div>
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

export default Main;
