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

const suspendCampaign = (campaignId) => {
  putData(`/campaign/${campaignId}/suspend/`)
    .then((data) => {
      Flux.dispatchEvent('suspendCampaign', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('CampaignStoreError', err);
    });
}

export { getCampaign, approveCampaign, rejectCampaign, suspendCampaign };
