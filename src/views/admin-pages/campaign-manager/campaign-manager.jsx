import React, { Component } from 'react';
import {
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import {
  I18n
} from 'react-i18next';
import { Clients, ClientCampaigns } from '../';
import {
  Container,
  Col,
  Row,
  Nav,
  NavLink,
  NavItem,
  Media,
} from 'reactstrap';
class CampaignManager extends Component {
  render() {
    if (this.props.match.isExact) {
      return <Redirect to="/admin/campaign-manager/client-campaigns" />
    }

    return (<I18n>{(t, { i18n }) => (

      <Container>
        <Nav tabs className="nav mt-5">
         <NavItem className="App-tabs-50">
           <NavLink tag={Link} to="/admin/campaign-manager/client-campaigns" active={(this.props.location.pathname === '/admin/campaign-manager/client-campaigns')}>
             { t('CAMPAIGN_MANAGER.campaign') }
           </NavLink>
         </NavItem>
         <NavItem className="App-tabs-50">
           <NavLink tag={Link} to="/admin/campaign-manager/clients" active={(this.props.location.pathname === '/admin/campaign-manager/clients')}>
             { t('CAMPAIGN_MANAGER.client') }
           </NavLink>
         </NavItem>
       </Nav>
        <Route exact path="/admin/campaign-manager/clients" component={Clients}/>
        <Route exact path="/admin/campaign-manager/client-campaigns" component={ClientCampaigns}/>
      </Container>
    )}</I18n>);
  }
}

export default CampaignManager;
