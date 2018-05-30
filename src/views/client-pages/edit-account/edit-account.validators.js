import * as utils from '../../../utils';
import { i18next } from '../../../i18n';
import { createAccountValidator } from '../create-account/create-account.validators';

const editAccountValidator = (createAccountForm: CreateAccountForm, accountId) => {
  if (!utils.isValidInteger(accountId)) {
    throw new Error(i18next.t('CREATE_ACCOUNT.invalidAccountId'));
  }

  try {
    createAccountValidator(createAccountForm)
  } catch (err) {
    throw err;
  }
}

/**
 * Edit the account's photo
 * @param  {[type]} formData the photo
 * @param  {[type]} account  the account's id
 */
const editPhotoValidator = (formData, accountId) => {
  var formDataAsJson = {};

  formData.forEach((value, key) => {
    formDataAsJson[key] = value;
  });

  if (!formDataAsJson.photo || !formDataAsJson.photo.type ||
    (formDataAsJson.photo.type !== 'image/jpeg' &&
      formDataAsJson.photo.type !== 'image/png')) {
    throw new Error(i18next.t('PROFILE.invalidPhoto'));
  }

  if (!utils.isValidInteger(accountId)) {
    throw new Error(i18next.t('CREATE_ACCOUNT.invalidAccountId'));
  }
}

export { editAccountValidator, editPhotoValidator };
