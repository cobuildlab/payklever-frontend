import Flux from '@4geeksacademy/react-flux-dash';
import { getData } from '../../../fetch';

const getAccounts = () => {
  getData('/account/', true)
    .then((accounts) => {
      Flux.dispatchEvent('getAccounts', accounts);
    })
    .catch((err) => {
      Flux.dispatchEvent('AccountStoreError', err);
    });
}

export { getAccounts };
