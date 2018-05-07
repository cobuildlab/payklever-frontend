import Flux from '@4geeksacademy/react-flux-dash';

class CampaignStore extends Flux.DashStore {
  constructor() {
    super();

    /**
     * Notifies when the campaign list was loaded
     * @param {Array} campaigns the campaigns list
     */
    this.addEvent('getCampaigns');

    /**
     * Notifies when a campaign was created
     * @param {object} campaign the created campaign
     */
    this.addEvent('createCampaign');

    /**
     * Notifies when a campaign was approved
     */
    this.addEvent('approveCampaign');

    /**
     * Notifies when a campaign was rejected
     */
    this.addEvent('rejectCampaign');

    /**
     * Genres list
     * @param {Array} genres the genres list
     */
    this.addEvent('getGenres');

    /**
     * Ages list
     * @param {Array} ages the ages list
     */
    this.addEvent('getAges');

    /**
     * EstiMated Incomes list
     * @param {Array} estimatedIncomes the estimated incomes list
     */
    this.addEvent('getEstimatedIncomes');

    /**
     * Time frames list
     * @param {Array} timeFrames the Time frames list
     */
    this.addEvent('getTimeFrames');

    /**
     * Error handler
     * @param {Error} err the error from the action
     */
    this.addEvent('CampaignStoreError');
  }

  getGenres() {
    const genres = this.getState('getGenres') || [];

    return genres;
  }

  getAges() {
    const ages = this.getState('getAges') || [];

    return ages;
  }

  getTimeFrames() {
    const timeFrames = this.getState('getTimeFrames') || [];

    return timeFrames;
  }

  getEstimatedIncomes() {
    const estimatedIncomes = this.getState('getEstimatedIncomes') || [];

    return estimatedIncomes;
  }
}

const campaignStore = new CampaignStore();

export default campaignStore;
