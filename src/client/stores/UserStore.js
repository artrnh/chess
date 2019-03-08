import {action, computed, observable, runInAction} from 'mobx';

import Api from 'Api';

class UserStore {
    @observable _id = '';

    @observable name = '';

    @observable color = '';

    @observable game = '';

    @computed
    get userData() {
        return {
            _id: this._id,
            name: this.name,
            color: this.color,
            game: this.game
        };
    }

    get userFromLocalStorage() {
        return JSON.parse(localStorage.getItem('user'));
    }

    @action.bound
    async initUser() {
        const userDatafromLS = this.userFromLocalStorage;

        if (userDatafromLS) {
            Object.entries(userDatafromLS).forEach(([key, value]) => {
                this[key] = value;
            });

            return;
        }

        const {data} = await Api.user.initUser();

        runInAction(() => {
            Object.entries(data).forEach(([key, value]) => {
                this[key] = value;
            });
        });

        localStorage.setItem('user', JSON.stringify(data));
    }

    @action.bound
    joinGame(gameId) {
        this.game = gameId;

        this.updateLocalStorage();
    }

    @action.bound
    leaveGame() {
        this.game = '';

        this.updateLocalStorage();
    }

    @action.bound
    updateLocalStorage = () => {
        const userData = {
            _id: this._id,
            name: this.name,
            color: this.color,
            game: this.game
        };

        localStorage.setItem('user', JSON.stringify(userData));
    };
}

export default UserStore;
