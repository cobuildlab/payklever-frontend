import Flux from '@4geeksacademy/react-flux-dash';

class AuthStore extends Flux.Store {
  constructor() {
    super();
    this.state = {
      user: {},
      token: '',
    }
  }

  _setUser(data) {
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', JSON.stringify(data.token));

    this.setStoreState({
      user: data.user,
      token: data.token,
    }).emit('USER_ADDED');
  }

  _removeUser(data) {
    this.setStoreState({
      user: {},
      token: '',
    }).emit('USER_REMOVED');
  }

  getUser() {
    return this.state.user;
  }

  getCachedUser() {
    return {
      user: (typeof localStorage.getItem('user') === 'string') ?
        JSON.parse(localStorage.getItem('user')) : {},
      token: (typeof localStorage.getItem('token') === 'string') ?
        JSON.parse(localStorage.getItem('token')) : '',
    };
  }

  getToken() {
    return this.state.token;
  }

  isAuthenticated() {
    return (this.state.token.length > 0);
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
