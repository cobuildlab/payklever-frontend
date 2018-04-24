import Flux from '@4geeksacademy/react-flux-dash';
import { getData } from '../../../fetch';

const getAccounts = () => {
  return getData('/account/', true);
}

export { getAccounts };
