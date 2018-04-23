import Flux from '@4geeksacademy/react-flux-dash';
import { postData } from '../../fetch';
import { SignupForm } from './signup.classes';

class SignupActions extends Flux.Action {
  signup(signupForm: SignupForm) {
    return postData('/auth/register', signupForm, false);
  }
}

const signupActions = new SignupActions();

export default signupActions;
