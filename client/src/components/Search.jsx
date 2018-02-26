import React, { Component } from 'react';
import axios from 'axios'; // added this

class Search extends Component {
  // added this
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
          console.log('Need function to display results: ', data);
        }
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
          console.log('Need function to display results: ', data);
        }
      })
      .catch(err => console.log('Search error: ', err));
  }
  // added this

  render() {
    return (
      <div className="search">
        <input type="search" onChange={e => this.onChangeHandler(e)} />
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

export default Search;
