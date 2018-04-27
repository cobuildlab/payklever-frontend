import Flux from '@4geeksacademy/react-flux-dash';
import { postData } from '../../fetch';
import { SignupForm } from './signup.classes';

const signup = (signupForm: SignupForm) => {
  // TODO: add validator try catch
  return postData('/auth/register', signupForm, false)
  .then((res) => {
    Flux.dispatchEvent('signup', res);
  })
  .catch((err) => {
    Flux.dispatchEvent('AuthStoreError', err);
  });
}

export { signup };
