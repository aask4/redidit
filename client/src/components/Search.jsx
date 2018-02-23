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
    console.log('Search onChangeHandler value: ', this.state.search);
  }

  handleCreateButton() {
    axios
      .post('/subredidit', { subrediditName: this.state.search })
      .then(({ data }) => {
        // if (data.length === 0) { notify user to search instead }
        // else this.props.displaySubrediddit? To trigger view to new subreddit
        console.log('search result is: ', data);
      })
      .catch(err => console.log('Search error: ', err));
  }

  handleSearchButton() {
    axios
      .get('/subredidit', { params: { subrediditName: this.state.search } })
      .then(({ data }) => {
        // if (data.length === 0) { notify user to create instead }
        // else this.props.displaySubrediddit? To trigger view to subreddit
        console.log('search result is: ', data);
      })
      .catch(err => console.log('Search error: ', err));
  }
  // added this

  render() {
    return (
      <div
        style={{
          float: 'right',
          border: '2px solid black',
          padding: '0',
          width: '100px',
        }}
      >
        {/* added this */}
        <input type="search" onChange={e => this.onChangeHandler(e)} />
        <br />
        <button type="button" name="search" onClick={this.handleSearchButton}>
          search
        </button>
        <button type="button" name="create" onClick={this.handleCreateButton}>
          create
        </button>
        {/* added this */}
      </div>
    );
  }
}

export default Search;
