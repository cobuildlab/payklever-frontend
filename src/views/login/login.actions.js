import Flux from '@4geeksacademy/react-flux-dash';
import { postData } from '../../fetch';

class LoginActions extends Flux.Action {
  login(loginForm) {
    return postData('/accounts/login', loginForm)
    .then((res) => {
      localStorage.setItem('user', JSON.stringify(res.user));
      localStorage.setItem('token', JSON.stringify(res.token));
      this.dispatch('AuthStore.setUser', res);
    })
    .catch((err) => {
      console.log('loginError', err);
    })
  }
}

const loginActions = new LoginActions();

export default loginActions;
