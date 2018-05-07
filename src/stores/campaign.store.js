import Flux from '@4geeksacademy/react-flux-dash';

class CampaignStore extends Flux.DashStore {
  constructor() {
    super();

    /**
     * Notifies when the campaign list was loaded
     * @param {Array}  campaigns the campaign list
     */
    this.addEvent('getCampaigns', (campaigns) => {
      return campaigns;
    });

    /**
     * Notifies when a campaign was created
     * @param {object}  campaign the created campaign
     */
    this.addEvent('createCampaign', (campaign) => {
      return campaign;
    });

    /**
     * Notifies when a campaign was approved
     */
    this.addEvent('approveCampaign');

    /**
     * Notifies when a campaign was rejected
     */
    this.addEvent('rejectCampaign');

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
