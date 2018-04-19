import Flux from '@4geeksacademy/react-flux-dash';
import { postData } from '../../fetch';

class SignupActions extends Flux.Action {
  signup(signupForm) {
    return postData('/accounts/register', signupForm);
  }
}

const signupActions = new SignupActions();

export default signupActions;
