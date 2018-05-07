import React, { Component } from 'react';
import {
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { i18next } from '../../../i18n';
import { toast } from 'react-toastify';
import { SubNav } from '../../components';
import {
  I18n
} from 'react-i18next';
// import { Clients, Campaigns, Messages } from '../';
import {
  Container,
  Col,
  Row,
  Nav,
  NavLink,
  NavItem,
  Media,
  Table,
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { RingLoader } from 'react-spinners';

class CampaignsDetails extends Component {

  render() {
    return (<I18n>{(t, { i18n }) => (<div>
      <CSSTransition in={this.state.loading} timeout={500} classNames="fade-in" unmountOnExit>
        <div className="App-overlay">
          <div style={{width: '200px'}} className="App-center-loading">
            <h4 className="text-center">
                { t('CLIENTS.loadingClients') }
            </h4>
            <RingLoader size={200} color={'#75c044'} loading={true}/>
          </div>
        </div>
      </CSSTransition>
      <SubNav backRoute="/admin/campaign-manager/" titleI18n="PROFILE.profile"></SubNav>
      <Container className="p-0">
        <h1>HOLAAAAAA</h1>
      </Container>
    </div>)}</I18n>);
  }

  isLoading = (isLoading) => {
    this.setState({ loading: isLoading });
  }
}
export default CampaignsDetails;
