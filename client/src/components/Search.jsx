import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addActiveSubredidit } from '../actions/index';
import axios from 'axios';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.type]: e.target.value,
    });
  }

  handleCreateButton() {
    axios
      .post('/subredidit', { subrediditName: this.state.search })
      .then(({ data }) => {
        if (data === '404') {
          console.log('404, do search instead');
        } else {
          this.props.addActiveSubredidit(data);
        }
        document.getElementById('search').value = '';
      })
      .catch(err => console.log('Search error: ', err));
  }

  handleSearchButton() {
    axios
      .get('/subredidit', { params: { subrediditName: this.state.search } })
      .then(({ data }) => {
        if (data === '404') {
          console.log('404, ask user to create one');
        } else {
          this.props.addActiveSubredidit(data);
        }
        document.getElementById('search').value = '';
      })
      .catch(err => console.log('Search error: ', err));
  }

  render() {
    return (
      <div className="search">
        <input id="search" type="search" onChange={e => this.onChangeHandler(e)} />
        <br />
        <button type="button" name="search" onClick={() => this.handleSearchButton()}>
          search
        </button>
        <button type="button" name="create" onClick={() => this.handleCreateButton()}>
          create
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    active_subredidit: state.active_subredidit,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addActiveSubredidit,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, matchDispatchToProps)(Search);
