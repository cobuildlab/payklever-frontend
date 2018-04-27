import Flux from '@4geeksacademy/react-flux-dash';
import {
  postData
} from '../../fetch';
import { loginValidator } from './login.validators';

const login = (email, password) => {
  try {
    loginValidator(email, password);

    postData('/auth/login', { email: email, password: password }, false)
      .then((res) => {
        Flux.dispatchEvent('setUser', res);
      })
      .catch((err) => {
        Flux.dispatchEvent('AuthStoreError', err);
      });
  } catch (err) {
    Flux.dispatchEvent('AuthStoreError', err);
  }
}

export { login };
