import Flux from '@4geeksacademy/react-flux-dash';
import { getData } from '../../../fetch';

const getCampaigns = () => {
  getData('/campaign/')
    .then((campaigns) => {
      Flux.dispatchEvent('getCampaigns', campaigns);
    })
    .catch((err) => {
      Flux.dispatchEvent('CampaignStoreError', err);
    });
}

export { getCampaigns };
