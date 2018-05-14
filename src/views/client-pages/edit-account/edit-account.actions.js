import Flux from '@4geeksacademy/react-flux-dash';
import { putData, getData } from '../../../fetch';
import { CreateAccountForm } from '../create-account/create-account.classes';
import { editAccountValidator } from './edit-account.validators';

const editAccount = (createAccountForm: CreateAccountForm, accountId) => {
  try {
    editAccountValidator(createAccountForm, accountId);

    putData(`/account/${accountId}/`, createAccountForm, true)
      .then((res) => {
        Flux.dispatchEvent('editAccount', res);
      })
      .catch((err) => {
        Flux.dispatchEvent('AccountStoreError', err);
      });
  } catch (err) {
    Flux.dispatchEvent('AccountStoreError', err);
  }
}

const getAccount = (accountId) => {
  getData(`/account/${accountId}/`)
    .then((account) => {
      Flux.dispatchEvent('getAccount', account);
    })
    .catch((err) => {
      Flux.dispatchEvent('AccountStoreError', err);
    });
}

export { editAccount, getAccount };
