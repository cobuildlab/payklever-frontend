import Flux from '@4geeksacademy/react-flux-dash';
import { postData } from '../../../fetch';
import { CreateAccountForm } from './create-account.classes';

class CreateAccountActions extends Flux.Action {
  createAccount(createAccountForm: CreateAccountForm) {
    return postData('/account/', createAccountForm, true);
  }
}

const createAccountActions = new CreateAccountActions();

export default createAccountActions;
