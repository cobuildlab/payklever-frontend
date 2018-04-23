import Flux from '@4geeksacademy/react-flux-dash';

class MainNavActions extends Flux.Action {
  logout() {
    this.dispatch('AuthStore.removeUser');
  }
}

const mainNavActions = new MainNavActions();

export default mainNavActions;
