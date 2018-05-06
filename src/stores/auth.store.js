import Flux from '@4geeksacademy/react-flux-dash';

class AuthStore extends Flux.DashStore {
  constructor() {
    super();

    /**
     * Set the session's user
     * @param {object || undefined}  user undefined to delete user from
     * localStorage & logout
     */
    this.addEvent('setUser', (user) => {
      if (JSON.stringify(user) !== '{}' && user !== undefined) {
        localStorage.setItem('user', JSON.stringify(user));
      } else if (user === undefined) {
        localStorage.removeItem('user');
      }

      return user;
    });

    /**
     * Notifies when a user has signep up
     * @param {object}  user the registered user
     */
    this.addEvent('signup');

    /**
     * Error handler
     * @param {Error} err the error from the action
     */
    this.addEvent('AuthStoreError');
  }

  getUser() {
    const user = this.getState('setUser') || {};

    return user;
  }

  getToken() {
    const user = this.getState('setUser') || {};

    return user.token;
  }

  getCachedUser() {
    return (typeof localStorage.getItem('user') === 'string') ?
      JSON.parse(localStorage.getItem('user')) : {}
  }


  isAuthenticated() {
    const user = this.getState('setUser') || {};

    return (typeof user.token === 'string');
  }

  isAdmin() {
    const user = this.getState('setUser') || {};

    return (user.isAdmin === true);
  }

  isClient() {
    const user = this.getState('setUser') || {};

    return (user.isAdmin === false);
  }
}

const authStore = new AuthStore();

export default authStore;
