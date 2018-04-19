import Flux from '@4geeksacademy/react-flux-dash';

class AppActions extends Flux.Action {
  setCachedUser(data) {
    this.dispatch('AuthStore.setUser', data);
  }
}

const appActions = new AppActions();

export default appActions;
