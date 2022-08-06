import api from '../utils/api';
import { setAlert } from './alert';

import { GET_GAMES, UPDATE_GAME_IS_ENABLED } from './types';

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

//Update game isEnabled
export const updateGameIsEnabled = (id) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_GAME_IS_ENABLED,
      payload: id
    });
  } catch (err) {}
};

//Updates isEnabled properties on games on db
export const updateDBGamesIsEnabled = async (games) => {
  try {
    await api.post(`/games/`, games);
  } catch (err) {
    console.log(err);
  }
};
