import Flux from '@4geeksacademy/react-flux-dash';
import { getData, putData } from '../../../fetch';

const getCampaign = (campaignId) => {
  getData(`/campaign/${campaignId}/`)
    .then((campaign) => {
      Flux.dispatchEvent('getCampaign', campaign);
    })
    .catch((err) => {
      Flux.dispatchEvent('CampaignStoreError', err);
    });
}

const pauseCampaign = (campaignId) => {
  putData(`/campaign/${campaignId}/pause/`)
    .then((campaign) => {
      Flux.dispatchEvent('pauseCampaign', campaign);
    })
    .catch((err) => {
      Flux.dispatchEvent('CampaignStoreError', err);
    });
}

export { getCampaign, pauseCampaign };
