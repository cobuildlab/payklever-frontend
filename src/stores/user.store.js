import Flux from '@4geeksacademy/react-flux-dash';

class UserStore extends Flux.DashStore {
  constructor() {
    super();

    /**
     * Notifies when the user's list was loaded
     * @param {Array}  users the users list
     */
    this.addEvent('getUsers');

    /**
     * Notifies when a user was loaded
     * @param {object}  user
     */
    this.addEvent('getUser');

    /**
     * Error handler
     * @param {Error} err the error from the action
     */
    this.addEvent('UserStoreError');
  }
}

const userStore = new UserStore();

export default userStore;
