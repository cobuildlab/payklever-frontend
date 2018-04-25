import Flux from '@4geeksacademy/react-flux-dash';

class AccountStore extends Flux.DashStore {
  constructor() {
    super();

    /**
     * Notifies when a account was created
     * @param {object}  account the created account
     */
    this.addEvent('createAccount', (account) => {
      return account;
    });


    /**
     * Error handler
     * @param {Error} err the error from the action
     */
    this.addEvent('AccountStoreError', (err) => {
      return err;
    });
  }
}

const accountStore = new AccountStore();

export default accountStore;
