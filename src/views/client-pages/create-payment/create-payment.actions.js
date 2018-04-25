import Flux from '@4geeksacademy/react-flux-dash';
import { postData } from '../../../fetch';
import { CreatePaymentForm } from './create-payment.classes';

const createPayment = (createPaymentForm: CreatePaymentForm) => {
  return postData('/pay-media/', createPaymentForm, true)
    .then((res) => {
      Flux.dispatchEvent('createPayment', res);
    })
    .catch((err) => {
      Flux.dispatchEvent('PaymentStoreError', err);
    });
}

export { createPayment };
