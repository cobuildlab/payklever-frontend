import Flux from '@4geeksacademy/react-flux-dash';
import { getData } from '../../../fetch';

class PaymentMethodsActions extends Flux.Action {
  getPaymentMethods() {
    return getData('/pay-media/', true);
  }
}

const paymentMethodsActions = new PaymentMethodsActions();

export default paymentMethodsActions;
