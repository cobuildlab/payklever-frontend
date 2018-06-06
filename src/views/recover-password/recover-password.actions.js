import Flux from '@4geeksacademy/react-flux-dash';
import {
  postData
} from '../../fetch';
import { recoverPasswordValidator } from './recover-password.validators';

const recoverPassword = (email) => {
  try {
    recoverPasswordValidator(email);

    postData('/auth/forgot-password', { email }, false)
      .then((res) => {
        Flux.dispatchEvent('recoverPassword', res);
      })
      .catch((err) => {
        Flux.dispatchEvent('AuthStoreError', err);
      });
  } catch (err) {
    Flux.dispatchEvent('AuthStoreError', err);
  }
}

export { recoverPassword };
