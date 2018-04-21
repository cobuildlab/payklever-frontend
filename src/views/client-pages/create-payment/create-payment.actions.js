import Flux from '@4geeksacademy/react-flux-dash';
import { postData } from '../../../fetch';
import { CreatePaymentForm } from './create-payment.classes';

class CreatePaymentActions extends Flux.Action {
  createPayment(createPaymentForm: CreatePaymentForm) {
    return postData('/payment-methods/', createPaymentForm);
  }
}

const createPaymentActions = new CreatePaymentActions();

export default createPaymentActions;
