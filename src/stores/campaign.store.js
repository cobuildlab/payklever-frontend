import Flux from '@4geeksacademy/react-flux-dash';
import { i18next } from '../i18n';

class CampaignStore extends Flux.DashStore {
  constructor() {
    super();

    /**
     * Notifies when the campaign list was loaded
     * @param {Array} campaigns the campaigns list
     */
    this.addEvent('getCampaigns');

    /**
     * Notifies when a campaign was loaded
     * @param {object} campaign the campaign
     */
    this.addEvent('getCampaign');

    const formatCampaignStatistics = (statistics) => {
      if (JSON.stringify(statistics) === '{}' || !statistics ||
        !Array.isArray(statistics.smsSentCount) ||
        !Array.isArray(statistics.smsToBeSentCount) ||
        !Array.isArray(statistics.smsErrorsCount)) {
        return {};
      }

      const smsSentTotalCount = statistics
        .smsSentCount.reduce((a, b) => a + b.count, 0);
      const smsToBeSentTotalCount = statistics
        .smsToBeSentCount.reduce((a, b) => a + b.count, 0);
      const smsErrorsTotalCount = statistics
        .smsErrorsCount.reduce((a, b) => a + b.count, 0);

      const chartData = {
        labels: statistics.smsSentCount.map((smsSent) => smsSent.day),
        datasets: [{
          label: i18next.t('STATISTICS.smsSentCount', { count: smsSentTotalCount }),
          data: statistics.smsSentCount.map((smsSent) => smsSent.count),
          borderColor: '#74c044',
          backgroundColor: 'transparent',
        }, {
          label: i18next.t('STATISTICS.smsToBeSentCount', { count: smsToBeSentTotalCount }),
          data: statistics.smsToBeSentCount.map((smsToBeSent) => smsToBeSent.count),
          borderColor: '#007bff',
          backgroundColor: 'transparent',
        }, {
          label: i18next.t('STATISTICS.smsErrorsCount', { count: smsErrorsTotalCount }),
          data: statistics.smsErrorsCount.map((smsErrors) => smsErrors.count),
          borderColor: '#dc3545',
          backgroundColor: 'transparent',
        }, ],
      }

      return chartData;
    }

    /**
     * Notifies when the campaign's statistics was loaded
     * @param {object} statistics the campaign's statistics
     */
    this.addEvent('getCampaignStatistics', (statistics) => {
      return formatCampaignStatistics(statistics);
    });

    /**
     * Notifies when the account's campaigns statistics was loaded
     * @param {object} statistics the campaign's statistics
     */
    this.addEvent('getAccountStatistics', (statistics) => {
      return formatCampaignStatistics(statistics);
    });

    /**
     * Notifies when the campaign's metrics was loaded
     * @param {object} metrics the campaign's metrics statistics
     */
    this.addEvent('getCampaignMetrics');

    /**
     * Notifies when a campaign was created
     * @param {object} campaign the created campaign
     */
    this.addEvent('createCampaign');

    /**
     * Notifies when a campaign was updated
     * @param {object} campaign the updated campaign
     */
    this.addEvent('updateCampaign');

    /**
     * Notifies after requestApproval call
     */
    this.addEvent('requestApproval');

    /**
     * Notifies when a campaign was approved
     */
    this.addEvent('approveCampaign');

    /**
     * Notifies when a campaign was rejected
     */
    this.addEvent('rejectCampaign');

    /**
     * Notifies when a campaign was suspended
     */
    this.addEvent('suspendCampaign');

    /**
     * Notifies when a campaign was resumed
     */
    this.addEvent('resumeCampaign');

    /**
     * Notifies when a campaign was paused
     */
    this.addEvent('pauseCampaign');

    /**
     * Notifies when a campaign was duplicated
     */
    this.addEvent('duplicateCampaign');

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
