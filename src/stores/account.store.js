import Flux from '@4geeksacademy/react-flux-dash';

class AccountStore extends Flux.DashStore {
  constructor() {
    super();

    /**
     * Notifies when the account list was loaded
     * @param {Array}  accounts the account list
     */
    this.addEvent('getAccounts');

    /**
     * Notifies when an account was created
     * @param {object}  account the created account
     */
    this.addEvent('createAccount');

    /**
     * Notifies when the account was changed
     * @param {object} account the new account
     */
    this.addEvent('changeAccount');

    /**
     * Error handler
     * @param {Error} err the error from the action
     */
    this.addEvent('AccountStoreError');
  }

  /**
   * Get the selected account
   * @return {object} the last selected account
   */
  getAccount() {
    const account = this.getState('changeAccount') || {};

    return account;
  }
}

const accountStore = new AccountStore();

export default accountStore;
