import Flux from '@4geeksacademy/react-flux-dash';
import {
  postData
} from '../../fetch';
import { resetPasswordValidator } from './reset-password.validators';

const resetPassword = (password1, password2, token) => {
  try {
    resetPasswordValidator(password1, password2, token);

    postData(`/auth/reset-password/${token}`, { password1, password2 }, false)
      .then((res) => {
        Flux.dispatchEvent('resetPassword', res);
      })
      .catch((err) => {
        Flux.dispatchEvent('AuthStoreError', err);
      });
  } catch (err) {
    Flux.dispatchEvent('AuthStoreError', err);
  }
}

export { resetPassword };
