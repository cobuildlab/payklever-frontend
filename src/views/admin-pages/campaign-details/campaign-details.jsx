import React, { Component } from 'react';
import { i18next } from '../../../i18n';
import { toast } from 'react-toastify';
import { SubNav, Campaign, Loading, ModalConfirm, LineChart, CampaignMetrics } from '../../components';
import {
  I18n
} from 'react-i18next';
import {
  Container,
  Col,
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
      smsSent: 0,
      smsToBeSent: 0,
      smsErrors: 0,
      suspendCampaignIsOpen: false,
      approveCampaignIsOpen: false,
      rejectCampaignIsOpen: false,
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
        this.isLoading(false);
      });

    this.getCampaignMetricsSubscription = campaignStore
      .subscribe('getCampaignMetrics', (metrics) => {
        this.setState({ metrics });
        this.isLoading(false);
      });

    this.approveCampaignSubscription = campaignStore
      .subscribe('approveCampaign', (data) => {
        this.isLoading(false);
        toast.dismiss();
        toast.success(i18next.t('CAMPAIGN_DETAILS.campaignApproved'));
        this.props.history.push('/admin/campaign-manager/client-campaigns');
      });

    this.rejectCampaignSubscription = campaignStore
      .subscribe('rejectCampaign', (data) => {
        this.isLoading(false);
        toast.dismiss();
        toast.success(i18next.t('CAMPAIGN_DETAILS.campaignRejected'));
        this.props.history.push('/admin/campaign-manager/client-campaigns');
      });

    this.suspendCampaignSubscription = campaignStore
      .subscribe('suspendCampaign', (data) => {
        this.isLoading(false);
        toast.dismiss();
        toast.success(i18next.t('CAMPAIGN_DETAILS.campaignSuspended'));
        this.props.history.push('/admin/campaign-manager/client-campaigns');
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
    this.approveCampaignSubscription.unsubscribe();
    this.rejectCampaignSubscription.unsubscribe();
    this.suspendCampaignSubscription.unsubscribe();
    this.campaignStoreError.unsubscribe();
  }

  render() {
    return (<I18n>{(t, { i18n }) => (<div>
      <SubNav backRoute="/admin/campaign-manager/client-campaigns" subNavTitle={this.state.campaign.name || ' '}></SubNav>

      <Loading isLoading={this.state.loading} loadingMessage={ t(this.state.loadingI18n) }></Loading>

      <ModalConfirm isOpen={this.state.approveCampaignIsOpen} modalHeader={t('CAMPAIGN_DETAILS.approveHeader')} modalBody={t('CAMPAIGN_DETAILS.approveBody', { campaignName: this.state.campaign.name || ' ' } )}
      acceptI18n="CAMPAIGN_DETAILS.approveCampaign" confirm={this.approveCampaign} />

      <ModalConfirm isOpen={this.state.rejectCampaignIsOpen} modalHeader={t('CAMPAIGN_DETAILS.rejectHeader')} modalBody={t('CAMPAIGN_DETAILS.rejectBody', { campaignName: this.state.campaign.name || ' ' })} inputLabel={t('APP.optionalMsg')}
      acceptI18n="CAMPAIGN_DETAILS.rejectCampaign" confirm={this.rejectCampaign} />

      <ModalConfirm isOpen={this.state.suspendCampaignIsOpen} modalHeader={t('CAMPAIGN_DETAILS.suspendHeader')} modalBody={t('CAMPAIGN_DETAILS.suspendBody', { campaignName: this.state.campaign.name || ' ' })} inputLabel={t('APP.optionalMsg')}
      acceptI18n="CAMPAIGN_DETAILS.suspendCampaign" confirm={this.suspendCampaign} />

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

      {(this.state.campaign.adminStatus === 'wa' || this.state.campaign.adminStatus === 'su') ?
        <Col className="mt-5 mb-5 text-center" md={{size: 12}}>
          <Button onClick={() => this.rejectCampaign(false)} className="mr-2" color="danger" type="button">
            { t('CAMPAIGN_DETAILS.rejectCampaign') }
          </Button>
          <Button onClick={() => this.approveCampaign(false)} className="" color="success" type="button">
              { t('CAMPAIGN_DETAILS.approveCampaign') }
          </Button>
        </Col>
      : null }

      {(this.state.campaign.adminStatus === 'ap') ?
        <Button onClick={() => this.suspendCampaign(false)} className="mx-auto d-block mt-5 mb-5" color="danger" type="button">
          { t('CAMPAIGN_DETAILS.suspendCampaign') }
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
   * toggles the approveCampaign modal and approve the campaign if you pass confirm = true
   * @param  {Boolean} [confirm=false] pass true from the ModalConfirm
   * component only to approve the campaign
   */
  approveCampaign = (confirm = false) => {
    this.setState({ approveCampaignIsOpen: !this.state.approveCampaignIsOpen });

    if (confirm === true) {
      this.isLoading(true, 'CAMPAIGN_DETAILS.approvingCampaign');
      CampaignDetailsActions.approveCampaign(this.state.campaign.id);
    }
  }

  /**
   * toggles the rejectCampaign modal and reject the campaign if you pass confirm = true
   * @param  {Boolean} [confirm=false] pass true from the ModalConfirm
   * component only to reject the campaign
   */
  rejectCampaign = (confirm = false, msg) => {

    this.setState({ rejectCampaignIsOpen: !this.state.rejectCampaignIsOpen });

    if (confirm === true) {
      this.isLoading(true, 'CAMPAIGN_DETAILS.rejectingCampaign');
      CampaignDetailsActions.rejectCampaign(this.state.campaign.id, msg);
    }
  }

  /**
   * toggles the rejectCampaign modal and suspend the campaign if you pass confirm = true
   * @param  {Boolean} [confirm=false] pass true from the ModalConfirm
   * component only to suspend the campaign
   */
  suspendCampaign = (confirm = false, msg) => {

    this.setState({ suspendCampaignIsOpen: !this.state.suspendCampaignIsOpen });

    if (confirm === true) {
      this.isLoading(true, 'CAMPAIGN_DETAILS.suspendingCampaign');
      CampaignDetailsActions.suspendCampaign(this.state.campaign.id, msg);
    }
  }

  isLoading = (isLoading, loadingI18n = this.state.loadingI18n) => {
    this.setState({
      loadingI18n,
      loading: isLoading
    });
  }
}
export default CampaignDetails;
