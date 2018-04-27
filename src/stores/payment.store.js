import Flux from '@4geeksacademy/react-flux-dash';

class PaymentStore extends Flux.DashStore {
  constructor() {
    super();

    /**
     * Notifies when the payment methods list was loaded
     * @param {Array}  paymentMethods the payments list
     */
    this.addEvent('getPayments', (paymentMethods) => {
      return paymentMethods;
    });

    /**
     * Notifies when a payment was created
     * @param {object}  payment the created payment
     */
    this.addEvent('createPayment', (payment) => {
      return payment;
    });


    /**
     * Error handler
     * @param {Error} err the error from the action
     */
    this.addEvent('PaymentStoreError', (err) => {
      return err;
    });
  }
}

const paymentStore = new PaymentStore();

export default paymentStore;
