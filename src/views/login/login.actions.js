import Flux from '@4geeksacademy/react-flux-dash';
import { postData } from '../../fetch';

class LoginActions extends Flux.Action {
  login(loginForm) {
    return postData('/auth/login', loginForm, false)
    .then((res) => {
      this.dispatch('AuthStore.setUser', res);
    })
    .catch((err) => {
      console.log('loginError', err);
    })
  }
}

const loginActions = new LoginActions();

export default loginActions;
