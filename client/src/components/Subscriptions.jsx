import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addActiveSubredidit } from '../actions/index';

class Subscriptions extends React.Component {
  constructor(props) {
    super(props);
  }

  selectSubredidit(sub) {
    console.log(sub);
    // this.props.addActiveSubredidit(sub)
  }

  render() {
    return (
      <div>
        {this.props.active_user ? (
          <div>
            MySubscriptions:
            {/* <button type="button" onClick={() => this.selectSubredidit()} /> */}
            {/* <select name="userSubscriptions">
              {this.props.active_user.subredidits.map(sub => (
                <option onClick={() => this.selectSubredidit(sub)} value={sub.name}>
                  {sub.name}
                </option>
              ))}
            </select> */}
          </div>
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
