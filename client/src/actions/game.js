import api from '../utils/api';
import { setAlert } from './alert';

import { GET_GAMES } from './types';

//Get all open events
export const getGames = () => async (dispatch) => {
  try {
    const res = await api.get(`/games/`);

    dispatch({
      type: GET_GAMES,
      payload: res.data
    });
  } catch (err) {}
};
