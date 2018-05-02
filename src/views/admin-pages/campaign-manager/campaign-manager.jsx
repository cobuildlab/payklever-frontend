import React, { Component } from 'react';
import {
  Route,
  Link,
  Redirect,
} from "react-router-dom";
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
} from 'reactstrap';
class CampaignManager extends Component {
  render() {
    return (<I18n>{(t, { i18n }) => (
      <Container>
        <Nav tabs className="nav mt-4">
         <NavItem className="tabs-profile-admin">
           <NavLink tag={Link} to="/client/profile/accounts" active={(this.props.location.pathname === '/admin/campaign-manager/clients')}>
             { t('ADMIN.client') }
           </NavLink>
         </NavItem>
         <NavItem className="tabs-profile-admin">
           <NavLink tag={Link} to="/client/profile/payment-methods" active={(this.props.location.pathname === '/admin/campaign-manager/campaigns')}>
             { t('ADMIN.campaign') }
           </NavLink>
         </NavItem>
         <NavItem className="tabs-profile-admin">
           <NavLink tag={Link} to="/client/profile/payment-methods" active={(this.props.location.pathname === '/admin/campaign-manager/messages')}>
             { t('ADMIN.message') }
           </NavLink>
         </NavItem>
       </Nav>
        {/* <Route exact path="'/admin/campaign-manager/clients" component={Clients}/>
        <Route exact path="/admin/campaign-manager/campaigns" component={Campaigns}/>
        <Route exact path="/admin/campaign-manager/messages" component={Messages}/> */}
      </Container>
    )}</I18n>);
  }
}

export default CampaignManager;
