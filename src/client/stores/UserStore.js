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
            this.updateStoreFields(userDatafromLS);

            return;
        }

        const {data} = await Api.user.initUser();

        runInAction(() => {
            this.updateStoreFields(data);
        });

        localStorage.setItem('user', JSON.stringify(data));
    }

    @action.bound
    joinGame(userId, gameId) {
        if (userId !== this._id) return;

        this.game = gameId;

        this.updateLocalStorage();
    }

    @action.bound
    leaveGame(userId) {
        if (userId !== this._id) return;

        this.game = '';

        this.updateLocalStorage();
    }

    @action.bound
    updateLocalStorage = () => {
        localStorage.setItem('user', JSON.stringify(this.userData));
    };

    @action.bound
    async setColor(id, color) {
        const {data} = await Api.user.updateUser(id, {color});

        runInAction(() => {
            this.updateStoreFields(data);
            this.updateLocalStorage();
        });
    }

    @action.bound
    updateStoreFields(data) {
        Object.entries(data).forEach(([key, value]) => {
            this[key] = value;
        });
    }
}

export default UserStore;
