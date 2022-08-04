import api from '../utils/api';
import { setAlert } from './alert';

import {
  EVENT_CREATED,
  EVENT_DELETED,
  EVENT_UPDATED,
  GET_EVENT,
  GET_EVENTS,
  EVENT_ERROR,
  CLEAR_EVENT
} from './types';

//Get all open events
export const getOpenEvents = () => async (dispatch) => {
  try {
    const res = await api.get(`/event/all/open/`);

    dispatch({
      type: GET_EVENTS,
      payload: res.data
    });
  } catch (err) {}
};

//Create or update event
export const createEvent =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const res = await api.post('/event', formData);

      dispatch({
        type: GET_EVENT,
        payload: res.data
      });

      dispatch(setAlert(edit ? 'Event Updated' : 'Event Created', 'success'));

      navigate('/dashboard');
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: EVENT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

//Get event
export const getEvent = (id) => async (dispatch) => {
  try {
    const res = await api.get(`event/${id}`);

    dispatch({
      type: GET_EVENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Clear loaded event
export const clearEvent = () => async (dispatch) => {
  dispatch({
    type: CLEAR_EVENT
  });
};
