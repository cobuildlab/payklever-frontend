import Flux from '@4geeksacademy/react-flux-dash';

class CampaignStore extends Flux.DashStore {
  constructor() {
    super();

    /*
    Notifies when the campaign list was loaded
     */
    this.addEvent('getCampaigns');

    /*
    Notifies when a campaign was created
     */
    this.addEvent('createCampaign');

    /*
    Genres list
     */
    this.addEvent('getGenres');

    /*
    Ages list
     */
    this.addEvent('getAges');

    /*
    Estimated income list
     */
    this.addEvent('getEstimatedIncomes');

    /*
    Time frame list
     */
    this.addEvent('getTimeFrames');

    /*
    Error handler
     */
    this.addEvent('CampaignStoreError');
  }
}

const campaignStore = new CampaignStore();

export default campaignStore;
