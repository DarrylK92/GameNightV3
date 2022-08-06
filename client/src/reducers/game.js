import { GET_GAMES, UPDATE_GAME_IS_ENABLED } from '../actions/types';

const initialState = {
  games: [],
  game: null,
  loading: true,
  error: {}
};

function gameReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_GAMES:
      return {
        ...state,
        games: payload,
        loading: false
      };
    case UPDATE_GAME_IS_ENABLED:
      let newGames = state.games;
      let foundGame = newGames.find((element) => (element._id == payload));
      foundGame.isEnabled = !foundGame.isEnabled;

      return {
        ...state,
        games: newGames,
        loading: false
      };
    default:
      return state;
  }
}

export default gameReducer;
