import Flux from '@4geeksacademy/react-flux-dash';
import { getData, putData } from '../../../fetch';

const getCampaigns = () => {
  getData('/campaign/all/')
    .then((campaigns) => {
      Flux.dispatchEvent('getCampaigns', campaigns);
    })
    .catch((err) => {
      Flux.dispatchEvent('CampaignStoreError', err);
    });
}

const approveCampaign = (campaignId) => {
  putData(`/campaign/${campaignId}/approve/`)
    .then((data) => {
      Flux.dispatchEvent('approveCampaign', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('CampaignStoreError', err);
    });
}

const rejectCampaign = (campaignId) => {
  putData(`/campaign/${campaignId}/reject/`)
    .then((data) => {
      Flux.dispatchEvent('rejectCampaign', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('CampaignStoreError', err);
    });
}

export { getCampaigns, approveCampaign, rejectCampaign };
