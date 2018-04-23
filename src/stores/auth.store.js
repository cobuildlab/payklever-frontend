import Flux from '@4geeksacademy/react-flux-dash';

class AuthStore extends Flux.Store {
  constructor() {
    super();
    this.state = {
      user: {},
    }
  }

  _setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));

    this.setStoreState({
      user: user,
    }).emit('USER_ADDED');
  }

  _removeUser() {
    localStorage.removeItem('user');

    this.setStoreState({
      user: {},
    }).emit('USER_REMOVED');
  }

  getUser() {
    return this.state.user;
  }

  getToken() {
    return this.state.user.token;
  }

  getCachedUser() {
    return (typeof localStorage.getItem('user') === 'string') ?
      JSON.parse(localStorage.getItem('user')) : {}
  }


  isAuthenticated() {
    return (typeof this.state.user.token === 'string');
  }

  isAdmin() {
    return (this.state.user.isAdmin === true);
  }

  isClient() {
    return (this.state.user.isAdmin === false);
  }
}

const authStore = new AuthStore();

export default authStore;
