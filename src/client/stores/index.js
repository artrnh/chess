import GameStore from './GameStore';
import GamesListStore from './GamesListStore';

export default {
  game: new GameStore(),
  gamesList: new GamesListStore(),
};
