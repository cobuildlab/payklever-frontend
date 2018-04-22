import Flux from '@4geeksacademy/react-flux-dash';

class AppActions extends Flux.Action {
  setCachedUser(user) {
    this.dispatch('AuthStore.setUser', user);
  }
}

const appActions = new AppActions();

export default appActions;
