import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import { getOpenEvents } from '../../actions/event';
import Events from './Events';

const Dashboard = ({ getOpenEvents, auth: { user }, event: { loading } }) => {
  useEffect(() => {
    getOpenEvents();

    if (user === null) {
      window.location.reload(false);
    }
  }, [getOpenEvents]);

  return (
    <section className="container">
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {loading === true && <Spinner />}
      {loading === false ? (
        <>
          <DashboardActions />

          <Events />
        </>
      ) : (
        <></>
      )}
    </section>
  );
};

Dashboard.propTypes = {
  getOpenEvents: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  event: state.event
});

export default connect(mapStateToProps, { getOpenEvents })(Dashboard);
