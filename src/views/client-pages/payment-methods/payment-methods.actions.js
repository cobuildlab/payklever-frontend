import Flux from '@4geeksacademy/react-flux-dash';
import { getData } from '../../../fetch';

const getPaymentMethods = () => {
  return getData('/pay-media/', true);
}

export { getPaymentMethods };
