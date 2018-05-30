import * as utils from '../../../utils';
import * as signupRegExp from '../../signup/signup.reg-exp';
import { i18next } from '../../../i18n';
import { EditProfileForm } from './edit-profile.classes';

/**
 * Validates the editProfileForm instance class and the fields
 * @param  {EditProfileForm} editProfileForm the form's data
 */
const editProfileValidator = (editProfileForm: EditProfileForm, userId) => {
  if (!(editProfileForm instanceof EditProfileForm)) {
    throw new Error(i18next.t('APP.invalidForm'))
  }

  if (!utils.isValidInteger(userId)) {
    throw new Error(i18next.t('EDIT_PROFILE.invalidUserId'));
  }

  if (!utils.isValidString(editProfileForm.firstName)) {
    throw new Error(i18next.t('SIGNUP.emptyFirstName'));
  }
  if (!utils.isValidString(editProfileForm.lastName)) {
    throw new Error(i18next.t('SIGNUP.emptyLastName'));
  }
  if (editProfileForm.password !== undefined) {
    if (!utils.isValidString(editProfileForm.password)) {
      throw new Error(i18next.t('SIGNUP.emptyPassword'));
    }
  }

  if (!signupRegExp.validFirstName.test(editProfileForm.firstName)) {
    throw new Error(`${i18next.t('SIGNUP.firstName')}: ${i18next.t('SIGNUP.invalidFirstName')}`);
  }
  if (!signupRegExp.validLastName.test(editProfileForm.lastName)) {
    throw new Error(`${i18next.t('SIGNUP.lastName')}: ${i18next.t('SIGNUP.invalidLastName')}`);
  }
  if (editProfileForm.password !== undefined) {
    if (!signupRegExp.validPassword.test(editProfileForm.password)) {
      throw new Error(`${i18next.t('SIGNUP.password')}: ${i18next.t('SIGNUP.invalidPassword')}`);
    }
  }
}


/*
Availity reactstrap Validation
 */
const editProfileAvForm = {
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
  password: {
    minLength: { value: 8 },
    maxLength: { value: 20 },
    pattern: { value: signupRegExp.validPassword },
  },
  repeatPassword: {
    match: { value: 'password' },
  },
}

export { editProfileValidator, editProfileAvForm };
