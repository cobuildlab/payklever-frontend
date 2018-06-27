import Flux from '@4geeksacademy/react-flux-dash';
import { getData } from '../../../fetch';

const getUsers = (page) => {
  getData(`/auth/user-paged?page=${page}`)
    .then((users) => {
      Flux.dispatchEvent('getUsers', users);
    })
    .catch((err) => {
      Flux.dispatchEvent('UserStoreError', err);
    });
}

export { getUsers };
