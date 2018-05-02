import Flux from '@4geeksacademy/react-flux-dash';
import { postData, getData } from '../../../fetch';
import { CreateCampaignForm } from './create-campaign.classes';
import { createCampaignValidator } from './create-campaign.validators';

const createCampaign = (createCampaignForm: CreateCampaignForm) => {
  try {
    createCampaignValidator(createCampaignForm);

    postData('/campaign/', createCampaignForm, true)
      .then((res) => {
        Flux.dispatchEvent('createCampaign', res);
      })
      .catch((err) => {
        Flux.dispatchEvent('CampaignStoreError', err);
      });
  } catch (err) {
    Flux.dispatchEvent('CampaignStoreError', err);
  }
}

const getGenres = () => {
  getData('/genre/')
    .then((genres) => {
      Flux.dispatchEvent('getGenres', genres);
    })
    .catch((err) => {
      Flux.dispatchEvent('CampaignStoreError', err);
    });
}

const getAges = () => {
  getData('/age/')
    .then((ages) => {
      Flux.dispatchEvent('getAges', ages);
    })
    .catch((err) => {
      Flux.dispatchEvent('CampaignStoreError', err);
    });
}

const getEstimatedIncomes = () => {
  getData('/estimated-income/')
    .then((estimatedIncomes) => {
      Flux.dispatchEvent('getEstimatedIncomes', estimatedIncomes);
    })
    .catch((err) => {
      Flux.dispatchEvent('CampaignStoreError', err);
    });
}

const getTimeFrames = () => {
  getData('/time-frame/')
    .then((estimatedIncomes) => {
      Flux.dispatchEvent('getTimeFrames', estimatedIncomes);
    })
    .catch((err) => {
      Flux.dispatchEvent('CampaignStoreError', err);
    });
}

export {
  createCampaign,
  getGenres,
  getAges,
  getEstimatedIncomes,
  getTimeFrames,
};
