import Flux from '@4geeksacademy/react-flux-dash';
import { postData } from '../../fetch';
import { SignupForm } from './signup.classes';

const signup = (signupForm: SignupForm) => {
  return postData('/auth/register', signupForm, false);
}

export { signup };
