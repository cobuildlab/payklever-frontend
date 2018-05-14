import Flux from '@4geeksacademy/react-flux-dash';
import { getData, deleteData } from '../../../fetch';

const getAccounts = () => {
  getData('/account/', true)
    .then((accounts) => {
      Flux.dispatchEvent('getAccounts', accounts);
    })
    .catch((err) => {
      Flux.dispatchEvent('AccountStoreError', err);
    });
}

const deleteAccount = (accountId) => {
  deleteData(`/account/${accountId}/`)
    .then((account) => {
      Flux.dispatchEvent('deleteAccount', account);
    })
    .catch((err) => {
      Flux.dispatchEvent('AccountStoreError', err);
    });
}

export { getAccounts, deleteAccount };
