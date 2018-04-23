import Flux from '@4geeksacademy/react-flux-dash';
import { getData } from '../../../fetch';

class AccountsActions extends Flux.Action {
  getAccounts() {
    return getData('/account/', true);
  }
}

const accountsActions = new AccountsActions();

export default accountsActions;
