import GameStore from './GameStore';
import GamesListStore from './GamesListStore';
import UserStore from './UserStore';
import EditorStore from './EditorStore';

export default {
    game: new GameStore(),
    gamesList: new GamesListStore(),
    user: new UserStore(),
    editor: new EditorStore()
};
