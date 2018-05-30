import Flux from '@4geeksacademy/react-flux-dash';
import { postData } from '../../../fetch';
import { CreatePaymentForm } from './create-payment.classes';
import { createPaymentValidator } from './create-payment.validators';

const createPayment = (createPaymentForm: CreatePaymentForm) => {
  try {
    createPaymentValidator(createPaymentForm);

    postData('/pay-media/', createPaymentForm, true)
      .then((res) => {
        Flux.dispatchEvent('createPayment', res);
      })
      .catch((err) => {
        Flux.dispatchEvent('PaymentStoreError', err);
      });
  } catch (err) {
    Flux.dispatchEvent('PaymentStoreError', err);
  }
}

export { createPayment };
