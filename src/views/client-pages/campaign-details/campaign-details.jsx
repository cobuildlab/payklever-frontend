import React, { Component } from 'react';
import { i18next } from '../../../i18n';
import { toast } from 'react-toastify';
import { SubNav, Campaign, Loading, ModalConfirm, LineChart, CampaignMetrics } from '../../components';
import {
  I18n
} from 'react-i18next';
import {
  Container,
  Button,
  Input,
  Form,
  FormGroup,
} from 'reactstrap';
import { campaignStore } from '../../../stores';
import * as CampaignDetailsActions from './campaign-details.actions';

class CampaignDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      loadingI18n: '',
      campaignId: props.match.params.campaignId || '',
      campaign: {},
      chartData: {},
      metrics: {},
      days: 7,
      daysList: [7, 30, 90],
      duplicateCampaignIsOpen: false,
      resumeCampaignIsOpen: false,
      pauseCampaignIsOpen: false,
    };
  }

  componentDidMount() {
    this.getCampaignSubscription = campaignStore
      .subscribe('getCampaign', (campaign) => {
        this.setState({ campaign });
        this.isLoading(false);
      });

    this.getCampaignStatisticsSubscription = campaignStore
      .subscribe('getCampaignStatistics', (chartData) => {
        this.setState({ chartData });
        if (this.state.loadingI18n === 'STATISTICS.loadingStatistics') {
          this.isLoading(false);
        }
      });

    this.getCampaignMetricsSubscription = campaignStore
      .subscribe('getCampaignMetrics', (metrics) => {
        this.setState({ metrics });
      });

    this.resumeCampaignSubscription = campaignStore
      .subscribe('resumeCampaign', (campaign) => {
        this.isLoading(false);
        toast.dismiss();
        toast.success(i18next.t('CAMPAIGN_DETAILS.campaignResumed'));
        this.props.history.push(`/client/campaigns`);
      });

    this.pauseCampaignSubscription = campaignStore
      .subscribe('pauseCampaign', (campaign) => {
        this.isLoading(false);
        toast.dismiss();
        toast.success(i18next.t('CAMPAIGN_DETAILS.campaignPaused'));
        this.props.history.push(`/client/campaigns`);
      });

    this.duplicateCampaignSubscription = campaignStore
      .subscribe('duplicateCampaign', (campaign) => {
        this.isLoading(false);
        toast.dismiss();
        toast.success(i18next.t('CAMPAIGN_DETAILS.campaignDuplicated'));
        this.props.history.push(`/client/create-campaign/${campaign.id}`);
      });

    this.campaignStoreError = campaignStore
      .subscribe('CampaignStoreError', (err) => {
        this.isLoading(false);
        toast.dismiss();
        toast.error(err.message || i18next.t('FETCH.error'));
      });

    setTimeout(() => {
      this.isLoading(true, 'CAMPAIGN_DETAILS.loadingCampaign');
      CampaignDetailsActions.getCampaign(this.state.campaignId);
      CampaignDetailsActions.getCampaignMetrics(this.state.campaignId);
      CampaignDetailsActions.getCampaignStatistics(this.state.campaignId, this.state.days);
    });
  }

  componentWillUnmount() {
    this.getCampaignSubscription.unsubscribe();
    this.getCampaignStatisticsSubscription.unsubscribe();
    this.getCampaignMetricsSubscription.unsubscribe();
    this.resumeCampaignSubscription.unsubscribe();
    this.pauseCampaignSubscription.unsubscribe();
    this.duplicateCampaignSubscription.unsubscribe();
    this.campaignStoreError.unsubscribe();
  }

  render() {
    return (<I18n>{(t, { i18n }) => (<div>
      <SubNav backRoute="/client/campaigns" subNavTitle={this.state.campaign.name || ' '}
      navItemHidden={(this.state.campaign.adminStatus !== 're' && this.state.campaign.adminStatus !== 'na')}
      navItemTitle={t('CAMPAIGN_DETAILS.editCampaign')} navItemFunc={this.goToEditCampaign}
      navItem2Title={t('CAMPAIGN_DETAILS.duplicateCampaign')} navItem2Func={this.duplicateCampaign}></SubNav>

      <Loading isLoading={this.state.loading} loadingMessage={ t(this.state.loadingI18n) }></Loading>

      <ModalConfirm isOpen={this.state.duplicateCampaignIsOpen} modalHeader={t('CAMPAIGN_DETAILS.duplicateHeader')} modalBody={t('CAMPAIGN_DETAILS.duplicateBody', { campaignName: this.state.campaign.name || ' ' } )}
      acceptI18n="CAMPAIGN_DETAILS.duplicateCampaign" confirm={this.duplicateCampaign} />

      <ModalConfirm isOpen={this.state.resumeCampaignIsOpen} modalHeader={t('CAMPAIGN_DETAILS.resumeHeader')} modalBody={t('CAMPAIGN_DETAILS.resumeBody', { campaignName: this.state.campaign.name || ' ' } )}
      acceptI18n="CAMPAIGN_DETAILS.resumeCampaign" confirm={this.resumeCampaign} />

      <ModalConfirm isOpen={this.state.pauseCampaignIsOpen} modalHeader={t('CAMPAIGN_DETAILS.pauseHeader')} modalBody={t('CAMPAIGN_DETAILS.pauseBody', { campaignName: this.state.campaign.name || ' ' })}
      acceptI18n="CAMPAIGN_DETAILS.pauseCampaign" confirm={this.pauseCampaign} />

      <Container className="mt-5">

      <Campaign campaign={this.state.campaign}></Campaign>

      <CampaignMetrics metrics={this.state.metrics}></CampaignMetrics>

      <Form className="mt-3" inline hidden={!Array.isArray(this.state.chartData.datasets)}>
        <FormGroup>
          <Input onChange={(evt) => this.onDaysChange(evt)} value={this.state.days} type="select" name="days">
            {this.state.daysList.map((day, index) =>
              <option key={index} value={day}>
                { t('STATISTICS.lastCountDays', { days: day }) }
              </option>
            )}
          </Input>
        </FormGroup>
      </Form>
      <LineChart data={this.state.chartData}></LineChart>

      {(this.state.campaign.adminStatus === 'ap' && this.state.campaign.status === 'ia') ?
        <Button onClick={() => {this.resumeCampaign(false)}} className="mx-auto d-block mt-5 mb-5" color="success" type="button">
          { t('CAMPAIGN_DETAILS.resumeCampaign') }
        </Button>
      : null }

      {(this.state.campaign.adminStatus === 'ap' && this.state.campaign.status === 'ac') ?
        <Button onClick={() => {this.pauseCampaign(false)}} className="mx-auto d-block mt-5 mb-5" color="danger" type="button">
          { t('CAMPAIGN_DETAILS.pauseCampaign') }
        </Button>
      : null }

      </Container>
    </div>)}</I18n>);
  }

  onDaysChange = (evt) => {
    this.setState({ days: evt.target.value });
    this.reloadStats(evt.target.value);
  }

  reloadStats = (days) => {
    this.isLoading(true, 'STATISTICS.loadingStatistics');
    CampaignDetailsActions.getCampaignStatistics(this.state.campaignId, days);
  }

  /**
   * toggles the resumeCampaign modal and resume the campaign if you pass confirm = true
   * @param  {Boolean} [confirm=false] pass true from the ModalConfirm
   * component only to resume the campaign
   */
  resumeCampaign = (confirm = false, campaign = undefined) => {
    this.setState({ resumeCampaignIsOpen: !this.state.resumeCampaignIsOpen });

    if (confirm === true) {
      this.isLoading(true, 'CAMPAIGN_DETAILS.resumingCampaign');
      CampaignDetailsActions.resumeCampaign(this.state.campaign.id);
    }
  }

  /**
   * toggles the pauseCampaign modal and pause the campaign if you pass confirm = true
   * @param  {Boolean} [confirm=false] pass true from the ModalConfirm
   * component only to pause the campaign
   */
  pauseCampaign = (confirm = false) => {

    this.setState({ pauseCampaignIsOpen: !this.state.pauseCampaignIsOpen });

    if (confirm === true) {
      this.isLoading(true, 'CAMPAIGN_DETAILS.pausingCampaign');
      CampaignDetailsActions.pauseCampaign(this.state.campaign.id);
    }
  }

  /**
   * toggles the duplicateCampaign modal and duplicate the campaign if you pass confirm = true
   * @param  {Boolean} [confirm=false] pass true from the ModalConfirm
   * component only to duplicate the campaign
   */
  duplicateCampaign = (confirm = false) => {

    this.setState({
      duplicateCampaignIsOpen: !this.state.duplicateCampaignIsOpen,
    });

    if (confirm === true) {
      this.isLoading(true, 'CAMPAIGN_DETAILS.duplicatingCampaign');
      CampaignDetailsActions.duplicateCampaign(this.state.campaign.id);
    }
  }

  goToEditCampaign = () => {
    this.props.history
      .push(`/client/create-campaign/${this.state.campaign.id}`);
  }

  isLoading = (isLoading, loadingI18n = this.state.loadingI18n) => {
    this.setState({
      loadingI18n,
      loading: isLoading
    });
  }
}
export default CampaignDetails;
