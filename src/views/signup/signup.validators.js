import * as utils from '../../utils';
import * as signupRegExp from './signup.reg-exp';
import { i18next } from '../../i18n';
import { SignupForm } from './signup.classes';

/**
 * Validates the signupForm instance class and the fields
 * @param  {SignupForm} signupForm the form's data
 */
const signupValidator = (signupForm: SignupForm) => {
  if (!(signupForm instanceof SignupForm)) {
    throw new Error(i18next.t('LOGIN.emptyEmail'))
  }

  if (!utils.isValidString(signupForm.firstName)) {
    throw new Error(i18next.t('SIGNUP.emptyFirstName'));
  }
  if (!utils.isValidString(signupForm.lastName)) {
    throw new Error(i18next.t('SIGNUP.emptyLastName'));
  }
  if (!utils.isValidString(signupForm.email)) {
    throw new Error(i18next.t('SIGNUP.emptyEmail'));
  }
  if (!utils.isValidString(signupForm.password)) {
    throw new Error(i18next.t('SIGNUP.emptyPassword'));
  }

  if (!signupRegExp.validFirstName.test(signupForm.firstName)) {
    throw new Error(`${i18next.t('SIGNUP.firstName')}: ${i18next.t('SIGNUP.invalidFirstName')}`);
  }
  if (!signupRegExp.validLastName.test(signupForm.lastName)) {
    throw new Error(`${i18next.t('SIGNUP.lastName')}: ${i18next.t('SIGNUP.invalidLastName')}`);
  }
  if (!signupRegExp.validEmail.test(signupForm.email)) {
    throw new Error(`${i18next.t('SIGNUP.email')}: ${i18next.t('SIGNUP.invalidEmail')}`);
  }
  if (!signupRegExp.validPassword.test(signupForm.password)) {
    throw new Error(`${i18next.t('SIGNUP.password')}: ${i18next.t('SIGNUP.invalidPassword')}`);
  }
}


/*
Availity reactstrap Validation
 */
const signupAvForm = {
  firstName: {
    required: true,
    minLength: { value: 3 },
    maxLength: { value: 40 },
    pattern: { value: signupRegExp.validFirstName }
  },
  lastName: {
    required: true,
    minLength: { value: 3 },
    maxLength: { value: 40 },
    pattern: { value: signupRegExp.validLastName },
  },
  email: {
    email: true,
    required: true,
  },
  password: {
    required: true,
    minLength: { value: 8 },
    maxLength: { value: 20 },
    pattern: { value: signupRegExp.validPassword },
  },
  repeatPassword: {
    match: { value: 'password' },
    required: true,
  },
  privacyPolicy: {
    required: true,
  }
}

export { signupValidator, signupAvForm };
