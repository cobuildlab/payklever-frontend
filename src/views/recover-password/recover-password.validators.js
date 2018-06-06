import * as utils from '../../utils';
import { i18next } from '../../i18n';
import * as signupRegExp from '../signup/signup.reg-exp';

const recoverPasswordValidator = (email) => {
  if (!utils.isValidString(email)) {
    throw new Error(i18next.t('LOGIN.emptyEmail'));
  }

  if (!signupRegExp.validEmail.test(email)) {
    throw new Error(`${i18next.t('SIGNUP.email')}: ${i18next.t('SIGNUP.invalidEmail')}`);
  }
}

export { recoverPasswordValidator };
