import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../utils/formatDate';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

const Events = ({ event: { events }, auth: { user } }) => {
  let eventsContent;

  if (user !== null && user !== undefined) {
    if (events !== null && events !== undefined) {
      eventsContent = events.map((oneEvent) => (
        <>
          <tr key={oneEvent._id}>
            <td>{oneEvent.name}</td>
            <td>{formatDate(oneEvent.createDate)}</td>
            <td>{formatDate(oneEvent.autoCloseDate)}</td>
            <td>{oneEvent.amountVoted}</td>
            <td>{oneEvent.amountOfVotes}</td>
            <td>
              <button className="btn btn-secondary">
                <Link
                  to={'/event/vote/' + oneEvent._id}
                  state={{ backUrl: '/dashboard' }}
                >
                  Vote
                </Link>
              </button>
            </td>
            {user.isAdmin === true && (
              <td>
                <button className="btn btn-secondary">
                  <Link
                    to={'/event/' + oneEvent._id}
                    state={{ backUrl: '/dashboard' }}
                  >
                    Edit
                  </Link>
                </button>
              </td>
            )}
          </tr>
        </>
      ));
    }
  }

  return (
    <Fragment>
      {eventsContent === null || eventsContent === undefined ? (
        <Spinner />
      ) : (
        <>
          <h2 className="my-2">Open Events</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th className="hide-sm">Create date</th>
                <th className="hide-sm">Auto close date</th>
                <th className="hide-sm">Amount of voters</th>
                <th className="hide-sm">Amount of votes</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>{eventsContent}</tbody>
          </table>
        </>
      )}
    </Fragment>
  );
};

Events.propTypes = {
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  event: state.event,
  auth: state.auth
});

export default connect(mapStateToProps)(Events);
