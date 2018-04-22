import Flux from '@4geeksacademy/react-flux-dash';
import { getData } from '../../../fetch';

class Campaigns extends Flux.Action {
  getCampaigns() {
    return getData('/campaigns/', true);
  }
}

const campaigns = new Campaigns();

export default campaigns;
