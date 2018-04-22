import Flux from '@4geeksacademy/react-flux-dash';
import { postData } from '../../../fetch';
import { CreateCampaignForm } from './create-campaign.classes';

class CreateCampaignActions extends Flux.Action {
  createCampaign(createCampaignForm: CreateCampaignForm) {
    return postData('/campaigns/', createCampaignForm, true);
  }
}

const createCampaignActions = new CreateCampaignActions();

export default createCampaignActions;
