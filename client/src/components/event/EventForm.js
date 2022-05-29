import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createEvent, getEvent } from '../../actions/event';
const moment = require('moment');

let initialState = {
  name: '',
  autoCloseDate: ''
};

const AddEvent = ({ createEvent, getEvent, event: { event, loading } }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);

  const { id } = useParams();
  useEffect(() => {
    if (id !== null && id !== undefined) {
      if (event === null) {
        getEvent(id);
      }

      if (!loading && event) {
        const eventData = { ...initialState };
        for (const key in event) {
          if (key in eventData) eventData[key] = event[key];

          if (key == 'autoCloseDate') {
            eventData[key] = moment(event[key]).format('YYYY-MM-DD');
          }
        }

        setFormData(eventData);
      }
    }
  }, [loading, getEvent, event]);

  const { name, autoCloseDate } = formData;

  let titleText = 'Add Event';

  if (id !== null && id !== undefined) {
    titleText = 'Edit Event';
  }

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section className="container">
      <h1 className="large text-primary">{titleText}</h1>
      <p className="lead">Event details:</p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();

          if (id !== null && id !== undefined) {
            createEvent(formData, navigate, true);
          } else {
            createEvent(formData, navigate);
          }
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="Event Name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
          {name !== '' && <small className="form-text">Name</small>}
          <div className="form-group">
            <h4>Auto Close Date</h4>
            <input
              type="date"
              name="date"
              value={autoCloseDate}
              onChange={onChange}
            />
          </div>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  );
};

AddEvent.propTypes = {
  createEvent: PropTypes.func.isRequired,
  getEvent: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  event: state.event
});

export default connect(mapStateToProps, { createEvent, getEvent })(AddEvent);
