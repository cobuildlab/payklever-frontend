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
     * Notifies when the user's account list was loaded (for admin)
     * @param {Array}  accounts the account list
     */
    this.addEvent('getUserAccounts');

    /**
     * Notifies when an account was loaded
     * @param {object}  account the account
     */
    this.addEvent('getAccount');

    /**
     * Notifies when an account was created
     * @param {object}  account the created account
     */
    this.addEvent('createAccount');

    /**
     * Notifies when an account was updated
     * @param {object}  account the updated account
     */
    this.addEvent('editAccount');

    /**
     * Notifies when a user updated his photo
     */
    this.addEvent('editAccountPhoto');

    /**
     * Edit photo error handler
     */
    this.addEvent('editAccountPhotoError');

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
