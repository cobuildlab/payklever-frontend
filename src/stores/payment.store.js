import Flux from '@4geeksacademy/react-flux-dash';

class PaymentStore extends Flux.DashStore {
  constructor() {
    super();

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
