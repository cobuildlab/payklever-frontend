import * as utils from '../../../utils';
import { i18next } from '../../../i18n';

/**
 * Edit the profile's photo
 * @param  {[type]} formData the photo
 * @param  {[type]} userId  the user's id
 */
const editPhotoValidator = (formData, userId) => {
  var formDataAsJson = {};

  formData.forEach((value, key) => {
    formDataAsJson[key] = value;
  });

  if (!formDataAsJson.photo || !formDataAsJson.photo.type ||
    (formDataAsJson.photo.type !== 'image/jpeg' &&
      formDataAsJson.photo.type !== 'image/png')) {
    throw new Error(i18next.t('PROFILE.invalidPhoto'));
  }

  if (!utils.isValidInteger(userId)) {
    throw new Error(i18next.t('EDIT_PROFILE.invalidUserId'));
  }
}

export { editPhotoValidator };
