import React, { Component } from 'react';
import {
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { i18next } from '../../../i18n';
import { toast } from 'react-toastify';
import { SubNav, Campaign, Loading, ModalConfirm } from '../../components';
import {
  I18n
} from 'react-i18next';
import {
  Container,
  Col,
  Row,
  Nav,
  NavLink,
  NavItem,
  Media,
  Table,
  Button,
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

    this.approveCampaignSubscription = campaignStore
      .subscribe('approveCampaign', (data) => {
        this.isLoading(false);
        toast.dismiss();
        toast.success(i18next.t('CLIENT_CAMPAIGNS.campaignApproved'));
        this.props.history.push('/admin/campaign-manager/client-campaigns');
      });

    this.rejectCampaignSubscription = campaignStore
      .subscribe('rejectCampaign', (data) => {
        this.isLoading(false);
        toast.dismiss();
        toast.success(i18next.t('CLIENT_CAMPAIGNS.campaignRejected'));
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
    });
  }

  componentWillUnmount() {
    this.getCampaignSubscription.unsubscribe();
    this.approveCampaignSubscription.unsubscribe();
    this.rejectCampaignSubscription.unsubscribe();
    this.campaignStoreError.unsubscribe();
  }

  render() {
    return (<I18n>{(t, { i18n }) => (<div>
      <SubNav backRoute="/admin/campaign-manager/client-campaigns" subNavTitle={this.state.campaign.name || ' '}></SubNav>

      <Loading isLoading={this.state.loading} loadingMessage={ t(this.state.loadingI18n) }></Loading>

      <ModalConfirm isOpen={this.state.approveCampaignIsOpen} modalHeader={t('CLIENT_CAMPAIGNS.approveHeader')} modalBody={t('CLIENT_CAMPAIGNS.approveBody', { campaignName: this.state.campaign.name || ' ' } )}
      acceptI18n="CLIENT_CAMPAIGNS.approve" confirm={this.approveCampaign} />

      <ModalConfirm isOpen={this.state.rejectCampaignIsOpen} modalHeader={t('CLIENT_CAMPAIGNS.rejectHeader')} modalBody={t('CLIENT_CAMPAIGNS.rejectBody', { campaignName: this.state.campaign.name || ' ' })}
      acceptI18n="CLIENT_CAMPAIGNS.reject" confirm={this.rejectCampaign} />

      <Container className="mt-5">

      <Campaign campaign={this.state.campaign}></Campaign>

      {(this.state.campaign.adminStatus === 'wa') ? <Col className="mt-5 mb-5 text-center" md={{size: 12}}>
       <Button onClick={() => this.rejectCampaign(false)} className="mr-2" color="danger" type="button">
          { t('CAMPAIGN_DETAILS.rejectCampaign') }
        </Button>
        <Button onClick={() => this.approveCampaign(false)} className="" color="success" type="button">
          { t('CAMPAIGN_DETAILS.approveCampaign') }
        </Button>
      </Col>
      : null }

      {/* TODO: suspendCampaign */}
      {(this.state.campaign.adminStatus === 'ap') ?
        <Button className="mx-auto d-block mt-5 mb-5" color="danger" type="button">
          { t('CAMPAIGN_DETAILS.suspendCampaign') }
        </Button>
      : null }

      </Container>
    </div>)}</I18n>);
  }

  /**
   * toggles the approveCampaign modal and approve the campaign if you pass confirm = true
   * @param  {Boolean} [confirm=false] pass true from the ModalConfirm
   * component only to approve the campaign
   */
  approveCampaign = (confirm = false, campaign = undefined) => {
    this.setState({ approveCampaignIsOpen: !this.state.approveCampaignIsOpen });

    if (confirm === true) {
      this.isLoading(true, 'CLIENT_CAMPAIGNS.approvingCampaign');
      CampaignDetailsActions.approveCampaign(this.state.campaign.id);
    }
  }

  /**
   * toggles the rejectCampaign modal and reject the campaign if you pass confirm = true
   * @param  {Boolean} [confirm=false] pass true from the ModalConfirm
   * component only to reject the campaign
   */
  rejectCampaign = (confirm = false) => {

    this.setState({ rejectCampaignIsOpen: !this.state.rejectCampaignIsOpen });

    if (confirm === true) {
      this.isLoading(true, 'CLIENT_CAMPAIGNS.rejectingCampaign');
      CampaignDetailsActions.rejectCampaign(this.state.campaign.id);
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
