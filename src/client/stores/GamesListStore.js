import {action, observable, runInAction} from 'mobx';
import _ from 'lodash';

import Api from 'Api';

class GamesListStore {
    @observable games = [];

    @observable loading = false;

    @action.bound
    async createGame(name, userId, rules) {
        const {data} = await Api.gamesList.createGame(name, userId, rules);

        runInAction(() => {
            this.games.push(data);
        });

        return data;
    }

    @action.bound
    async getAllGames() {
        this.loading = true;

        const {data} = await Api.gamesList.getGames();

        runInAction(() => {
            this.games = data;
            this.loading = false;
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

    @action.bound
    joinGame(joinedUser, gameId) {
        const joinedGame = this.games.find(game => game._id === gameId);

        if (joinedGame.users.every(user => !_.isEqual(user, joinedUser))) {
            joinedGame.users.push(joinedUser);
        }
    }

    @action.bound
    leaveGame(leavedUser, gameId) {
        const leavedGame = this.games.find(game => game._id === gameId);
        const disconnestedUserIndex = leavedGame.users.findIndex(
            user => user._id === leavedUser._id
        );

        leavedGame.users.splice(disconnestedUserIndex, 1);
    }
}

export default GamesListStore;
