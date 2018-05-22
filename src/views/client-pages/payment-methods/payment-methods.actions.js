import Flux from '@4geeksacademy/react-flux-dash';
import { getData, deleteData } from '../../../fetch';

const getPaymentMethods = () => {
  getData('/pay-media/')
    .then((paymentMethods) => {
      Flux.dispatchEvent('getPayments', paymentMethods);
    })
    .catch((err) => {
      Flux.dispatchEvent('PaymentStoreError', err);
    });;
}

const deletePayment = (payMediaId) => {
  deleteData(`/pay-media/${payMediaId}/`)
    .then((res) => {
      Flux.dispatchEvent('deletePayment', res);
    })
    .catch((err) => {
      Flux.dispatchEvent('PaymentStoreError', err);
    });;
}

export { getPaymentMethods, deletePayment };
