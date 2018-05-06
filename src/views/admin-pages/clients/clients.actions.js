import Flux from '@4geeksacademy/react-flux-dash';
import { getData } from '../../../fetch';

const getUsers = () => {
  getData('/auth/user')
    .then((users) => {
      Flux.dispatchEvent('getUsers', users);
    })
    .catch((err) => {
      Flux.dispatchEvent('UserStoreError', err);
    });
}

export { getUsers };
