import Flux from '@4geeksacademy/react-flux-dash';
import { postData } from '../../../fetch';
import { CreateAccountForm } from './create-account.classes';
import { createAccountValidator } from './create-account.validators';

const createAccount = (createAccountForm: CreateAccountForm) => {
  try {
    createAccountValidator(createAccountForm);

    postData('/account/', createAccountForm, true)
      .then((res) => {
        Flux.dispatchEvent('createAccount', res);
      })
      .catch((err) => {
        Flux.dispatchEvent('AccountStoreError', err);
      });
  } catch (err) {
    Flux.dispatchEvent('AccountStoreError', err);
  }
}

export { createAccount };
