import Flux from '@4geeksacademy/react-flux-dash';
import { getData } from '../../../fetch';

const getPaymentMethods = () => {
  getData('/pay-media/', true)
    .then((paymentMethods) => {
      Flux.dispatchEvent('getPayments', paymentMethods);
    })
    .catch((err) => {
      Flux.dispatchEvent('PaymentStoreError', err);
    });;
}

export { getPaymentMethods };
