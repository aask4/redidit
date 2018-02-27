import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addActiveSubredidit } from "../actions/index";
import axios from "axios";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleCreate404: false,
      toggleSearch404: false,
      search: ""
    };
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.type]: e.target.value
    });
  }

  handleCreateButton() {
    if (this.props.active_user) {
      axios
        .post("/subredidit", { subrediditName: this.state.search })
        .then(({ data }) => {
          if (data === 404) {
            this.setState({ toggleCreate404: true });
          } else {
            this.props.addActiveSubredidit(data);
            this.setState({ toggleCreate404: false, toggleSearch404: false });
          }
          document.getElementById("search").value = "";
        })
        .catch(err => console.log("Search error: ", err));
    } else {
      console.log("prompt user to login or signup");
    }
  }

  handleSearchButton() {
    axios
      .get("/subredidit", { params: { name: this.state.search } })
      .then(({ data }) => {
        if (data === 404) {
          this.setState({ toggleSearch404: true });
        } else {
          this.props.addActiveSubredidit(data);
          this.setState({ toggleSearch404: false, toggleCreate404: false });
        }
        document.getElementById("search").value = "";
      })
      .catch(err => console.log("Search error: ", err));
  }

  render() {
    return (
      <div className="search">
        {this.state.toggleCreate404 && <div>Subredidit Exists. Try Search</div>}
        {this.state.toggleSearch404 && (
          <div>Subredidit Not Found. Try Create</div>
        )}
        <input
          id="search"
          type="search"
          onChange={e => this.onChangeHandler(e)}
        />
        <br />
        <button
          type="button"
          name="search"
          onClick={() => this.handleSearchButton()}
        >
          search
        </button>
        <button
          type="button"
          name="create"
          onClick={() => this.handleCreateButton()}
        >
          create
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    active_subredidit: state.active_subredidit,
    active_user: state.active_user
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addActiveSubredidit
    },
    dispatch
  );
}

export default connect(mapStateToProps, matchDispatchToProps)(Search);
