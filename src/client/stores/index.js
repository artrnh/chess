import GameStore from './GameStore';
import GamesListStore from './GamesListStore';
import UserStore from './UserStore';

export default {
  game: new GameStore(),
  gamesList: new GamesListStore(),
  user: new UserStore(),
};
