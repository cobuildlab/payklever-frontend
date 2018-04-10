import Flux from '@4geeksacademy/react-flux-dash';

class LoginActions extends Flux.Action {
  login(loginForm) {
    //: TODO fetch login API to get user data
    const user = {
        email: loginForm.email,
        token: 'fawifawfoiahw',
        isAdmin: (loginForm.email === 'admin'),
    };

    localStorage.setItem('user', JSON.stringify(user));
    this.dispatch('AuthStore.setUser', user);
  }
}

const loginActions = new LoginActions();

export default loginActions;
