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
  Button,
} from 'reactstrap';
import { campaignStore } from '../../../stores';
import * as CreateCampaignActions from '../create-campaign/create-campaign.actions';
import * as CampaignDetailsActions from './campaign-details.actions';

class CampaignDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      loadingI18n: '',
      campaignId: props.match.params.campaignId || '',
      campaign: {},
      duplicateCampaignIsOpen: false,
      activateCampaignIsOpen: false,
      pauseCampaignIsOpen: false,
    };
  }

  componentDidMount() {
    this.getCampaignSubscription = campaignStore
      .subscribe('getCampaign', (campaign) => {
        this.setState({ campaign });
        this.isLoading(false);
      });

    this.activateCampaignSubscription = campaignStore
      .subscribe('activateCampaign', (campaign) => {
        this.isLoading(false);
        toast.dismiss();
        toast.success(i18next.t('CREATE_CAMPAIGN.campaignActivated'));
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
    });
  }

  componentWillUnmount() {
    this.getCampaignSubscription.unsubscribe();
    this.activateCampaignSubscription.unsubscribe();
    this.pauseCampaignSubscription.unsubscribe();
    this.duplicateCampaignSubscription.unsubscribe();
    this.campaignStoreError.unsubscribe();
  }

  render() {
    return (<I18n>{(t, { i18n }) => (<div>
      <SubNav backRoute="/client/campaigns" subNavTitle={this.state.campaign.name || ' '}
      navItemHidden={(this.state.campaign.adminStatus === 'wa' || this.state.campaign.adminStatus === 'ap' || this.state.campaign.adminStatus === 'su')}
      navItemTitle={t('CAMPAIGN_DETAILS.editCampaign')} navItemFunc={this.goToEditCampaign}
      navItem2Title={t('CAMPAIGN_DETAILS.duplicateCampaign')} navItem2Func={this.duplicateCampaign}></SubNav>

      <Loading isLoading={this.state.loading} loadingMessage={ t(this.state.loadingI18n) }></Loading>

      <ModalConfirm isOpen={this.state.duplicateCampaignIsOpen} modalHeader={t('CAMPAIGN_DETAILS.duplicateHeader')} modalBody={t('CAMPAIGN_DETAILS.duplicateBody', { campaignName: this.state.campaign.name || ' ' } )}
      acceptI18n="CAMPAIGN_DETAILS.duplicateCampaign" confirm={this.duplicateCampaign} />

      <ModalConfirm isOpen={this.state.activateCampaignIsOpen} modalHeader={t('CAMPAIGN_DETAILS.activateHeader')} modalBody={t('CAMPAIGN_DETAILS.activateBody', { campaignName: this.state.campaign.name || ' ' } )}
      acceptI18n="CAMPAIGN_DETAILS.activateCampaign" confirm={this.activateCampaign} />

      <ModalConfirm isOpen={this.state.pauseCampaignIsOpen} modalHeader={t('CAMPAIGN_DETAILS.pauseHeader')} modalBody={t('CAMPAIGN_DETAILS.pauseBody', { campaignName: this.state.campaign.name || ' ' })}
      acceptI18n="CAMPAIGN_DETAILS.pauseCampaign" confirm={this.pauseCampaign} />

      <Container className="mt-5">

      <Campaign campaign={this.state.campaign}></Campaign>

      {((this.state.campaign.adminStatus === 'na' || this.state.campaign.adminStatus === 're' || this.state.campaign.adminStatus === 'ap') && this.state.campaign.status === 'ia') ?
        <Button onClick={() => {this.activateCampaign(false)}} className="mx-auto d-block mt-5 mb-5" color="success" type="button">
          { t('CAMPAIGN_DETAILS.activateCampaign') }
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

  /**
   * toggles the activateCampaign modal and activate the campaign if you pass confirm = true
   * @param  {Boolean} [confirm=false] pass true from the ModalConfirm
   * component only to activate the campaign
   */
  activateCampaign = (confirm = false, campaign = undefined) => {
    this.setState({ activateCampaignIsOpen: !this.state.activateCampaignIsOpen });

    if (confirm === true) {
      this.isLoading(true, 'CAMPAIGN_DETAILS.activatingCampaign');
      CreateCampaignActions.activateCampaign(this.state.campaign.id);
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
