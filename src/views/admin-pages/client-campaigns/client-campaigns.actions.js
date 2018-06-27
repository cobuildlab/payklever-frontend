import Flux from '@4geeksacademy/react-flux-dash';
import { getData, putData } from '../../../fetch';

const getCampaigns = (page) => {
  getData(`/campaign/all/Paged?page=${page}`)
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

const getStatistics = (days) => {
  getData(`/statistics/?days=${days}`)
    .then((campaign) => {
      Flux.dispatchEvent('getCampaignStatistics', campaign);
    })
    .catch((err) => {
      Flux.dispatchEvent('CampaignStoreError', err);
    });
}

export { getCampaigns, getStatistics, approveCampaign, rejectCampaign };
