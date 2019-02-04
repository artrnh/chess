import { action, observable, runInAction } from 'mobx';

import Api from 'Api';

class GamesListStore {
  @observable games = [];

  @action.bound
  async createGame(name) {
    const { data } = await Api.gamesList.createGame(name);

    runInAction(() => {
      this.games.push(data);
    });
  }

  @action.bound
  async getAllGames() {
    const { data } = await Api.gamesList.getGames();

    runInAction(() => {
      this.games = data;
    });
  }

  @action.bound
  async deleteGame(id) {
    await Api.game.deleteGame(id);

    const gameIndex = this.games.findIndex(game => game._id === id);

    runInAction(() => {
      this.games.splice(gameIndex, 1);
    });
  }
}

export default GamesListStore;