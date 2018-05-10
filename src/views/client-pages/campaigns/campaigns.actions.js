import Flux from '@4geeksacademy/react-flux-dash';
import { getData } from '../../../fetch';

const getCampaigns = (accountId) => {
  getData(`/campaign/?accountId=${accountId}`)
    .then((campaigns) => {
      Flux.dispatchEvent('getCampaigns', campaigns);
    })
    .catch((err) => {
      Flux.dispatchEvent('CampaignStoreError', err);
    });
}

export { getCampaigns };
