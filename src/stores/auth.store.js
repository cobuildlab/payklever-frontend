import Flux from '@4geeksacademy/react-flux-dash';

class AuthStore extends Flux.Store {
  constructor() {
    super();
    this.state = {
      user: {
        name: 'Jose Villalobos',
        token: 'fawifawfoiahw',
        isAdmin: true,
      },
    }
  }

  _setUser(user) {
    this.setStoreState({
      user: user
    }).emit('USER_ADDED');
  }

  getUser() {
    return this.state.user;
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
