import Flux from '@4geeksacademy/react-flux-dash';
import { postData, getData, putData } from '../../../fetch';
import { CreateCampaignForm } from './create-campaign.classes';
import { draftCampaignValidator } from './create-campaign.validators';

const createCampaign = (createCampaignForm: CreateCampaignForm) => {
  try {
    draftCampaignValidator(createCampaignForm);

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

const updateCampaign = (createCampaignForm: CreateCampaignForm, campaignId) => {
  try {
    draftCampaignValidator(createCampaignForm, campaignId);

    putData(`/campaign/${campaignId}`, createCampaignForm, true)
      .then((res) => {
        Flux.dispatchEvent('updateCampaign', res);
      })
      .catch((err) => {
        Flux.dispatchEvent('CampaignStoreError', err);
      });
  } catch (err) {
    Flux.dispatchEvent('CampaignStoreError', err);
  }
}

const requestApproval = (campaignId) => {
  putData(`/campaign/${campaignId}/request-approval/`, {}, true)
    .then((res) => {
      Flux.dispatchEvent('requestApproval', res);
    })
    .catch((err) => {
      Flux.dispatchEvent('CampaignStoreError', err);
    });
}

const getCampaign = (campaignId) => {
  getData(`/campaign/${campaignId}/`)
    .then((campaign) => {
      Flux.dispatchEvent('getCampaign', campaign);
    })
    .catch((err) => {
      Flux.dispatchEvent('CampaignStoreError', err);
    });
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

const calculateSms = (totalBudget) => {
  getData(`/campaign/calculate-sms/?budget=${totalBudget}`)
    .then((smsQuantity) => {
      Flux.dispatchEvent('calculateSms', smsQuantity);
    })
    .catch((err) => {
      Flux.dispatchEvent('CampaignStoreError', err);
    });
}

const calculateBudget = (smsQuantity) => {
  getData(`/campaign/calculate-budget/?smsQuantity=${smsQuantity}`)
    .then((totalBudget) => {
      Flux.dispatchEvent('calculateBudget', totalBudget);
    })
    .catch((err) => {
      Flux.dispatchEvent('CampaignStoreError', err);
    });
}

export {
  createCampaign,
  getCampaign,
  getGenres,
  getAges,
  getEstimatedIncomes,
  getTimeFrames,
  updateCampaign,
  requestApproval,
  calculateSms,
  calculateBudget,
};
