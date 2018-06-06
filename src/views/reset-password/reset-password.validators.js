import * as utils from '../../utils';
import { i18next } from '../../i18n';
import * as signupRegExp from '../signup/signup.reg-exp';

const resetPasswordValidator = (password1, password2, token) => {
  if (!utils.isValidString(token)) {
    throw new Error(i18next.t('RESET_PASSWORD.emptyCode'));
  }

  if (!utils.isValidString(password1)) {
    throw new Error(i18next.t('SIGNUP.emptyPassword'));
  }

  if (!signupRegExp.validPassword.test(password1)) {
    throw new Error(`${i18next.t('SIGNUP.password')}: ${i18next.t('SIGNUP.invalidPassword')}`);
  }

  if (password1 !== password2) {
    throw new Error(i18next.t('SIGNUP.passwordNotMatch'));
  }
}

export { resetPasswordValidator };
