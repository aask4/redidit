import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addActiveSubredidit } from "../actions/index";

class Subscriptions extends React.Component {
  constructor(props) {
    super(props);
  }

  selectSubredidit(event) {
    let subName = event.target.value;
    let subredidit;

    this.props.subredidits.forEach(sub => {
      if (sub.name === subName) {
        subredidit = sub;
      }
    });
    this.props.addActiveSubredidit(subredidit);
  }

  render() {
    return (
      <div>
        <select name="subredidit" onChange={e => this.selectSubredidit(e)}>
          <option value="some">Some1Redidits</option>
          {this.props.subredidits &&
            this.props.subredidits.map((sub, i) => {
              if (i <= 10) {
                return (
                  <option key={i} value={sub.name}>
                    {sub.name}
                  </option>
                );
              }
            })}
        </select>
        {this.props.active_user ? (
          this.props.active_user.subredidit ? (
            <select
              name="userSubscriptions"
              onChange={e => this.selectSubredidit(e)}
            >
              <option value="main">MySubscriptions</option>
              {this.props.active_user.subredidit.map(sub => (
                <option key={sub.id} value={sub.name}>
                  {sub.name}
                </option>
              ))}
            </select>
          ) : (
            <div />
          )
        ) : (
          <div />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    active_user: state.active_user,
    subredidits: state.all_subredidit
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

export default connect(mapStateToProps, matchDispatchToProps)(Subscriptions);
