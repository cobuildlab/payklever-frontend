import Flux from '@4geeksacademy/react-flux-dash';
import { getData } from '../../../fetch';

const getUser = (userId) => {
  getData(`/auth/user/${userId}/`)
    .then((user) => {
      Flux.dispatchEvent('getUser', user);
    })
    .catch((err) => {
      Flux.dispatchEvent('UserStoreError', err);
    });
}

export { getUser };
