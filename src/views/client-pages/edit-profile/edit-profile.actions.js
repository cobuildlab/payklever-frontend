import Flux from '@4geeksacademy/react-flux-dash';
import { putData, getData } from '../../../fetch';
import { EditProfileForm } from './edit-profile.classes';
import { editProfileValidator } from './edit-profile.validators';

const editProfile = (editProfileForm: EditProfileForm, userId) => {
  try {
    editProfileValidator(editProfileForm, userId);

    putData(`/auth/user/${userId}/`, editProfileForm)
      .then((res) => {
        Flux.dispatchEvent('editProfile', res);
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

export { editProfile, setUser };
