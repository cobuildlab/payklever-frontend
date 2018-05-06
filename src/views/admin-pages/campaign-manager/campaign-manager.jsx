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
    return (<I18n>{(t, { i18n }) => (

      <Container>
        <Nav tabs className="nav mt-5">
         <NavItem className="tabs-profile-admin">
           <NavLink tag={Link} to="/admin/campaign-manager/clients" active={(this.props.location.pathname === '/admin/campaign-manager/clients')}>
             { t('CAMPAIGN_MANAGER.client') }
           </NavLink>
         </NavItem>
         <NavItem className="tabs-profile-admin">
           <NavLink tag={Link} to="/admin/campaign-manager/client-campaigns" active={(this.props.location.pathname === '/admin/campaign-manager/campaigns')}>
             { t('CAMPAIGN_MANAGER.campaign') }
           </NavLink>
         </NavItem>
         {/* <NavItem className="tabs-profile-admin">
           <NavLink tag={Link} to="/admin/campaign-manager/messages" active={(this.props.location.pathname === '/admin/campaign-manager/messages')}>
             { t('CAMPAIGN_MANAGER.message') }
           </NavLink>
         </NavItem> */}
       </Nav>
        <Route exact path="/admin/campaign-manager/clients" component={Clients}/>
        <Route exact path="/admin/campaign-manager/client-campaigns" component={ClientCampaigns}/>
        {/* <Route exact path="/admin/campaign-manager/messages" component={Messages}/> */}
      </Container>
    )}</I18n>);
  }
}

export default CampaignManager;
