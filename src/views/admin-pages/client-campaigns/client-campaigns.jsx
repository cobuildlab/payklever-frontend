import React, { Component } from 'react';
import {
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { i18next } from '../../../i18n';
import { toast } from 'react-toastify';
import { campaignStore } from '../../../stores';
import * as ClientCampaignsActions from './client-campaigns.actions';
import {
  I18n
} from 'react-i18next';
import {
  Container,
  Col,
  Row,
  Button,
  Table,
  Form,
  FormGroup,
  Input,
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ModalConfirm, Loading, LineChart } from '../../components';

class ClientCampaigns extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      loadingI18n: '',
      campaigns: [],
      selectedCampaign: {},
      chartData: {},
      days: 7,
      daysList: [7, 30, 90],
      approveCampaignIsOpen: false,
      rejectCampaignIsOpen: false,
    };
  }

  componentDidMount() {
    this.getCampaignsSubscription = campaignStore
      .subscribe('getCampaigns', (campaigns) => {
        this.setState({ campaigns });
        this.isLoading(false);
      });

    this.getCampaignStatisticsSubscription = campaignStore
      .subscribe('getCampaignStatistics', (chartData) => {
        this.setState({ chartData });
        this.isLoading(false);
      });

    this.approveCampaignSubscription = campaignStore
      .subscribe('approveCampaign', (data) => {
        this.isLoading(false);
        toast.dismiss();
        toast.success(i18next.t('CLIENT_CAMPAIGNS.campaignApproved'));
        ClientCampaignsActions.getCampaigns();
      });

    this.rejectCampaignSubscription = campaignStore
      .subscribe('rejectCampaign', (data) => {
        this.isLoading(false);
        toast.dismiss();
        toast.success(i18next.t('CLIENT_CAMPAIGNS.campaignRejected'));
        ClientCampaignsActions.getCampaigns();
      });

    this.campaignStoreError = campaignStore
      .subscribe('CampaignStoreError', (err) => {
        this.isLoading(false);
        toast.dismiss();
        toast.error(err.message || i18next.t('FETCH.error'));
      });

    this.isLoading(true, 'CLIENT_CAMPAIGNS.loadingCampaigns');
    ClientCampaignsActions.getCampaigns();
    ClientCampaignsActions.getStatistics(this.state.days);
  }

  componentWillUnmount() {
    this.getCampaignsSubscription.unsubscribe();
    this.getCampaignStatisticsSubscription.unsubscribe();
    this.approveCampaignSubscription.unsubscribe();
    this.rejectCampaignSubscription.unsubscribe();
    this.campaignStoreError.unsubscribe();
  }

  render() {
    return (<I18n>{(t, { i18n }) => (<div>
      <ModalConfirm isOpen={this.state.approveCampaignIsOpen} modalHeader={t('CLIENT_CAMPAIGNS.approveHeader')} modalBody={t('CLIENT_CAMPAIGNS.approveBody', { campaignName: this.state.selectedCampaign.name || ' ' } )}
      acceptI18n="CLIENT_CAMPAIGNS.approve" confirm={this.approveCampaign} />

      <ModalConfirm isOpen={this.state.rejectCampaignIsOpen} modalHeader={t('CLIENT_CAMPAIGNS.rejectHeader')} modalBody={t('CLIENT_CAMPAIGNS.rejectBody', { campaignName: this.state.selectedCampaign.name || ' ' })}
      acceptI18n="CLIENT_CAMPAIGNS.reject" confirm={this.rejectCampaign} />

      <Loading isLoading={this.state.loading} loadingMessage={ t(this.state.loadingI18n) }></Loading>

      <Container className="p-0">
        <Form className="mt-5" inline hidden={!Array.isArray(this.state.chartData.datasets)}>
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

        <Table hover className="mt-5">
        <thead>
          <tr>
            <th className="App-header-table-admin">{ t('CLIENT_CAMPAIGNS.campaignName') }</th>
            <th className="App-header-table-admin">{ t('CLIENT_CAMPAIGNS.messageTitle') }</th>
            <th className="App-header-table-admin">{ t('CLIENT_CAMPAIGNS.status') }</th>
            <th className="App-header-table-admin">{ t('CLIENT_CAMPAIGNS.adminStatus') }</th>
            {/* <th className="App-header-table-admin"></th> */}
          </tr>
        </thead>
        <tbody>
          <TransitionGroup component={null}>
           { this.state.campaigns.map((campaign) =>
             <CSSTransition key={campaign.id} timeout={500} classNames="fade-in">
               <tr>
                 <td>
                   <Link to={`/admin/campaign-details/${campaign.id}`}>
                      {campaign.name}
                   </Link>
                 </td>
                 <td>{campaign.messageTitle}</td>
                 <td>{t(`CAMPAIGN_USER_STATUS.${campaign.status}`)}</td>
                 <td>{t(`CAMPAIGN_ADMIN_STATUS.${campaign.adminStatus}`)}</td>
                 {/* <td className="text-right">
                   {(campaign.adminStatus === 'na') ? (<div>
                    <Button onClick={() => this.approveCampaign(false, campaign)} className="mr-2" title={ t('CLIENT_CAMPAIGNS.approve') } color="primary" size="sm">
                     <FontAwesomeIcon icon={faClipboardCheck}/>
                    </Button>
                    <Button onClick={() => this.rejectCampaign(false, campaign)} color="danger" title={ t('CLIENT_CAMPAIGNS.reject') } size="sm">
                     <FontAwesomeIcon icon={faBan}/>
                   </Button>
                  </div>)
                 : null }
                 </td> */}
               </tr>
             </CSSTransition>)}
          </TransitionGroup>
        </tbody>
      </Table>
      </Container>
    </div>)}</I18n>);
  }

  onDaysChange = (evt) => {
    this.setState({ days: evt.target.value });
    this.reloadStats(evt.target.value);
  }

  reloadStats = (days) => {
    this.isLoading(true, 'STATISTICS.loadingStatistics');
    ClientCampaignsActions.getStatistics(days);
  }

  /**
   * toggles the approveCampaign modal and approve the campaign if you pass confirm = true
   * @param  {Boolean} [confirm=false] pass true from the ModalConfirm
   * component only to approve the campaign
   * @param  {[type]}  [campaign=undefined] to set the last selected campaign,
   * pass the campaign from the campaign's list
   */
  approveCampaign = (confirm = false, campaign = undefined) => {
    if (campaign) this.setState({ selectedCampaign: campaign });

    this.setState({ approveCampaignIsOpen: !this.state.approveCampaignIsOpen });

    if (confirm === true) {
      this.isLoading(true, 'CLIENT_CAMPAIGNS.approvingCampaign');
      ClientCampaignsActions.approveCampaign(this.state.selectedCampaign.id);
    }
  }

  /**
   * toggles the rejectCampaign modal and reject the campaign if you pass confirm = true
   * @param  {Boolean} [confirm=false] pass true from the ModalConfirm
   * component only to reject the campaign
   * @param  {[type]}  [campaign=undefined] to set the last selected campaign,
   * * pass the campaign from the campaign's list
   */
  rejectCampaign = (confirm = false, campaign = undefined) => {
    if (campaign) this.setState({ selectedCampaign: campaign });

    this.setState({ rejectCampaignIsOpen: !this.state.rejectCampaignIsOpen });

    if (confirm === true) {
      this.isLoading(true, 'CLIENT_CAMPAIGNS.rejectingCampaign');
      ClientCampaignsActions.rejectCampaign(this.state.selectedCampaign.id);
    }
  }

  isLoading = (isLoading, loadingI18n = this.state.loadingI18n) => {
    this.setState({
      loadingI18n,
      loading: isLoading
    });
  }
}

export default ClientCampaigns;
