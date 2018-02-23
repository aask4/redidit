import React, { Component } from 'react'

class Search extends Component {
  render() {
    return (
      <div style={{float: 'right', border: '2px solid black', padding: '0', width: '100px'}}>
        <input type='search' />
      </div>
    )
  }
}

export default Search