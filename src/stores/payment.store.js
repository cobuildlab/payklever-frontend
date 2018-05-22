import Flux from '@4geeksacademy/react-flux-dash';

class PaymentStore extends Flux.DashStore {
  constructor() {
    super();

    /**
     * Notifies when the payment methods list was loaded
     * @param {Array}  paymentMethods the payments list
     */
    this.addEvent('getPayments');

    /**
     * Notifies when a payment was created
     * @param {object}  payment the created payment
     */
    this.addEvent('createPayment');

    /**
     * Notifies when a payment was deleted
     */
    this.addEvent('deletePayment');

    /**
     * Error handler
     * @param {Error} err the error from the action
     */
    this.addEvent('PaymentStoreError');
  }
}

const paymentStore = new PaymentStore();

export default paymentStore;
