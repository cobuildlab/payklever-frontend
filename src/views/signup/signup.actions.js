import Flux from '@4geeksacademy/react-flux-dash';
import { postData } from '../../fetch';
import { SignupForm } from './signup.classes';
import { i18next } from '../../i18n';
import { signupValidator } from './signup.validators';

const signup = (signupForm: SignupForm) => {
  try {
    signupValidator(signupForm);

    postData('/auth/register', signupForm, false)
      .then((res) => {
        Flux.dispatchEvent('signup', res);
      })
      .catch((err) => {
        if (err.error === 'SequelizeUniqueConstraintError: Validation error') {
          err.message = i18next.t('SIGNUP.emailInUse');
        }
        Flux.dispatchEvent('AuthStoreError', err);
      });
  } catch (err) {
    Flux.dispatchEvent('AuthStoreError', err);
  }
}

export { signup };
