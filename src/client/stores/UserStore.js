import { action, observable, runInAction } from 'mobx';

import Api from 'Api';

class UserStore {
  @observable _id = '';

  @observable name = '';

  @observable color = '';

  @observable game = '';

  @action.bound
  async initUser() {
    const userDatafromLS = JSON.parse(localStorage.getItem('user'));

    if (userDatafromLS) {
      Object.entries(userDatafromLS).forEach(([key, value]) => {
        this[key] = value;
      });

      return;
    }

    const { data } = await Api.user.initUser();

    runInAction(() => {
      Object.entries(data).forEach(([key, value]) => {
        this[key] = value;
      });
    });

    localStorage.setItem('user', JSON.stringify(data));
  }
}

export default UserStore;
