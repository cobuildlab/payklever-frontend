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

const resumeCampaign = (campaignId) => {
  putData(`/campaign/${campaignId}/resume/`)
    .then((campaign) => {
      Flux.dispatchEvent('resumeCampaign', campaign);
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

const duplicateCampaign = (campaignId) => {
  putData(`/campaign/${campaignId}/duplicate/`)
    .then((campaign) => {
      Flux.dispatchEvent('duplicateCampaign', campaign);
    })
    .catch((err) => {
      Flux.dispatchEvent('CampaignStoreError', err);
    });
}

export { getCampaign, getCampaignStatistics, getCampaignMetrics, resumeCampaign, pauseCampaign, duplicateCampaign };
