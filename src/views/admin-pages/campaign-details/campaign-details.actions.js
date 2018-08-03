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

const getCampaignStatistics = (campaignId, days) => {
  getData(`/statistics/campaign/${campaignId}?days=${days}`)
    .then((campaign) => {
      Flux.dispatchEvent('getCampaignStatistics', campaign);
    })
    .catch((err) => {
      Flux.dispatchEvent('CampaignStoreError', err);
    });
}

const getCampaignMetrics = (campaignId) => {
  getData(`/statistics/campaign-metrics/${campaignId}`)
    .then((campaign) => {
      Flux.dispatchEvent('getCampaignMetrics', campaign);
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

const rejectCampaign = (campaignId, msg) => {
  putData(`/campaign/${campaignId}/reject/`, { msg })
    .then((data) => {
      Flux.dispatchEvent('rejectCampaign', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('CampaignStoreError', err);
    });
}

const suspendCampaign = (campaignId, msg) => {
  putData(`/campaign/${campaignId}/suspend/`, { msg })
    .then((data) => {
      Flux.dispatchEvent('suspendCampaign', data);
    })
    .catch((err) => {
      Flux.dispatchEvent('CampaignStoreError', err);
    });
}

export { getCampaign, getCampaignStatistics, getCampaignMetrics, approveCampaign, rejectCampaign, suspendCampaign };
