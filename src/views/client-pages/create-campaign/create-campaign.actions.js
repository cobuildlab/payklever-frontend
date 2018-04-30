import Flux from '@4geeksacademy/react-flux-dash';
import { postData } from '../../../fetch';
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

export { createCampaign };
