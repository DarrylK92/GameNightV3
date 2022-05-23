import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../../img/logo.png';

const Landing = ({ isAuthenticated }) => {
  var button;
  if (isAuthenticated) {
    button = <div></div>;
  } else {
    button = (
      <Link to="/register" className="btn btn-primary">
        Sign Up
      </Link>
    );
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <div class="container">
            <img src={logo} />
          </div>
          <h1 className="x-large">DK Game Night</h1>
          <div className="buttons">{button}</div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
