import Flux from '@4geeksacademy/react-flux-dash';

class CampaignStore extends Flux.DashStore {
  constructor() {
    super();

    /**
     * Notifies when a campaign was created
     * @param {object}  campaign the created campaign
     */
    this.addEvent('createCampaign', (campaign) => {
      return campaign;
    });


    /**
     * Error handler
     * @param {Error} err the error from the action
     */
    this.addEvent('CampaignStoreError', (err) => {
      return err;
    });
  }
}

const campaignStore = new CampaignStore();

export default campaignStore;
