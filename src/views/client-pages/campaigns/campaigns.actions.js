import Flux from '@4geeksacademy/react-flux-dash';
import { getData } from '../../../fetch';

const getCampaigns = () => {
  return getData('/campaign/', true);
}

export { getCampaigns };
