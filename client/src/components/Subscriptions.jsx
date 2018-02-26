import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addActiveSubredidit } from '../actions/index';

class Subscriptions extends React.Component {
  constructor(props) {
    super(props);
  }

  selectSubredidit(e) {
    console.log(e.target.value);
    // this.props.addActiveSubredidit =
  }

  render() {
    {
      this.props.active_user ? (
        <div>
          MySubscriptions:
          <select name="userSubscriptions">
            {this.props.subredidits.map(sub => (
              <option onClick={e => this.selectSubredidit(e)} value={sub.name}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <p />
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    active_user: state.active_user,
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

export default connect(mapStateToProps, matchDispatchToProps)(Subscriptions);
