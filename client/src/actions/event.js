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