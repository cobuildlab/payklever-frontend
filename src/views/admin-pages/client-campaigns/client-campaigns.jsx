import React, { Component } from 'react';
import {
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faClipboardCheck,
  faBan,
} from '@fortawesome/fontawesome-free-solid';
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
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { RingLoader } from 'react-spinners';

class ClientCampaigns extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      campaigns: [],
    };
  }

  componentDidMount() {
    this.getCampaignsSubscription = campaignStore
      .subscribe('getCampaigns', (campaigns) => {
        this.setState({ campaigns });
        this.isLoading(false);
      });

    this.campaignStoreError = campaignStore
      .subscribe('CampaignStoreError', (err) => {
        this.isLoading(false);
        toast.dismiss();
        toast.error(err.message || i18next.t('FETCH.error'));
      });

    ClientCampaignsActions.getCampaigns();
  }

  componentWillUnmount() {
    this.getCampaignsSubscription.unsubscribe();
    this.campaignStoreError.unsubscribe();
  }

  render() {
    return (<I18n>{(t, { i18n }) => (<div>

      <CSSTransition in={this.state.loading} timeout={500} classNames="fade-in" unmountOnExit>
        <div className="App-overlay">
          <div style={{width: '200px'}} className="App-center-loading">
            <h4 className="text-center">
                { t('CLIENT_CAMPAIGNS.loadingCampaigns') }
            </h4>
            <RingLoader size={200} color={'#75c044'} loading={true}/>
          </div>
        </div>
      </CSSTransition>

      <Container>
        <Table>
        <thead>
          <tr>
            <th>{ t('CLIENT_CAMPAIGNS.campaignName') }</th>
            <th>{ t('CLIENT_CAMPAIGNS.messageTitle') }</th>
            <th>{ t('CLIENT_CAMPAIGNS.status') }</th>
            <th>{ t('CLIENT_CAMPAIGNS.adminStatus') }</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <TransitionGroup component={null}>
           { this.state.campaigns.map((campaign) =>
             <CSSTransition key={campaign.id} timeout={500} classNames="fade-in">
               <tr>
                 <td>{campaign.name}</td>
                 <td>{campaign.messageTitle}</td>
                 <td>{campaign.status}</td>
                 <td>{campaign.adminStatus}</td>
                 <td className="text-right">
                   {(campaign.adminStatus === 'wa') ? (<div>
                    <Button className="mr-2" title={ t('CLIENT_CAMPAIGNS.approve') } color="primary" size="sm">
                     <FontAwesomeIcon icon={faClipboardCheck}/>
                    </Button>
                    <Button color="danger" title={ t('CLIENT_CAMPAIGNS.reject') } size="sm">
                     <FontAwesomeIcon icon={faBan}/>
                   </Button>
                  </div>)
                 : null }
                 </td>
               </tr>
             </CSSTransition>)}
          </TransitionGroup>
        </tbody>
      </Table>
      </Container>
    </div>)}</I18n>);
  }

  isLoading = (isLoading) => {
    this.setState({ loading: isLoading });
  }
}

export default ClientCampaigns;
