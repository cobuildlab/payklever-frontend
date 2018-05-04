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

  getGenres() {
    const genres = this.getState().getGenres || [];

    return genres;
  }

  getAges() {
    const ages = this.getState().getAges || [];

    return ages;
  }

  getTimeFrames() {
    const timeFrames = this.getState().getTimeFrames || [];

    return timeFrames;
  }

  getEstimatedIncomes() {
    const estimatedIncomes = this.getState().getEstimatedIncomes || [];

    return estimatedIncomes;
  }
}

const campaignStore = new CampaignStore();

export default campaignStore;
