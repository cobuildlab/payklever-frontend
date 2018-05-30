import Flux from '@4geeksacademy/react-flux-dash';
import { postFormData } from '../../../fetch';
import { editPhotoValidator } from './profile.validators';

const editPhoto = (photoFormData, userId) => {
  try {
    editPhotoValidator(photoFormData, userId);

    postFormData(`/auth/user/${userId}/profile-picture/`, photoFormData)
      .then((res) => {
        Flux.dispatchEvent('editPhoto', res);
      })
      .catch((err) => {
        Flux.dispatchEvent('AuthStoreError', err);
      });
  } catch (err) {
    Flux.dispatchEvent('AuthStoreError', err);
  }
}

const setUser = (user) => {
  Flux.dispatchEvent('setUser', user);
}

export { editPhoto, setUser };
