import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';

const DashboardActions = ({ user }) => {
  useEffect(() => {
    if (!user) {
      loadUser();
    }
  }, [loadUser]);

  let extraButtonsDisplay;

  if (user !== null) {
    if (user.isAdmin) {
      extraButtonsDisplay = (
        <>
          <Link to="/create-event" className="btn btn-light">
            <i className="fas fa-plus-square text-primary" /> Add Event
          </Link>
        </>
      );
    }
  }

  return (
    <div className="dash-buttons">
      <Link
        to="/results"
        className="btn btn-light"
        state={{ backUrl: '/dashboard' }}
      >
        <i className="fas fa-user-circle text-primary" /> Results
      </Link>
      {extraButtonsDisplay}
    </div>
  );
};

DashboardActions.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(DashboardActions);
