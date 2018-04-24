import Flux from '@4geeksacademy/react-flux-dash';
import { postData } from '../../../fetch';
import { CreateAccountForm } from './create-account.classes';

const createAccount = (createAccountForm: CreateAccountForm) => {
  return postData('/account/', createAccountForm, true);
}

export { createAccount };
