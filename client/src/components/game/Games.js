import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../utils/formatDate';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { updateGameIsEnabled } from '../../actions/game';

const Games = ({ updateGameIsEnabled, game: { games }, auth: { user } }) => {
  let gamesContent;

  const toggleValue = (toggleId) => {
    updateGameIsEnabled(toggleId);
  };

  if (user !== null && user !== undefined) {
    if (games !== null && games !== undefined) {
      gamesContent = games.map((oneGame) => (
        <>
          <tr key={oneGame._id}>
            <td>{oneGame.name}</td>
            <td>
              <input
                type="checkbox"
                defaultChecked={oneGame.isEnabled}
                onChange={(e) => {
                  toggleValue(oneGame._id);
                }}
              ></input>
            </td>
            <td>{oneGame.ownerId.name}</td>
          </tr>
        </>
      ));
    }
  }

  return (
    <Fragment>
      {gamesContent === null || gamesContent === undefined ? (
        <Spinner />
      ) : (
        <>
          <h2 className="my-2">Games</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th className="hide-sm">Is enabled</th>
                <th className="hide-sm">Owner</th>
              </tr>
            </thead>
            <tbody>{gamesContent}</tbody>
          </table>
        </>
      )}
    </Fragment>
  );
};

Games.propTypes = {
  updateGameIsEnabled: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  game: state.game,
  auth: state.auth
});

export default connect(mapStateToProps, { updateGameIsEnabled })(Games);
