import Flux from '@4geeksacademy/react-flux-dash';
import { postData } from '../../../fetch';
import { CreateCampaignForm } from './create-campaign.classes';

const createCampaign = (createCampaignForm: CreateCampaignForm) => {
  return postData('/campaign/', createCampaignForm, true);
}

export { createCampaign };
