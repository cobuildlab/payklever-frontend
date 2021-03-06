import React, { Component } from 'react';
import {
  Route,
  Link,
  Redirect,
  Switch,
} from "react-router-dom";
import {
  I18n
} from 'react-i18next';
import { Clients, ClientCampaigns, Promotions } from '../';
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
         <NavItem className="App-tabs-33">
           <NavLink tag={Link} to="/admin/campaign-manager/client-campaigns" active={(this.props.location.pathname === '/admin/campaign-manager/client-campaigns')}>
             { t('CAMPAIGN_MANAGER.campaign') }
           </NavLink>
         </NavItem>
         <NavItem className="App-tabs-33">
           <NavLink tag={Link} to="/admin/campaign-manager/clients" active={(this.props.location.pathname === '/admin/campaign-manager/clients')}>
             { t('CAMPAIGN_MANAGER.client') }
           </NavLink>
         </NavItem>
         <NavItem className="App-tabs-33">
           <NavLink tag={Link} to="/admin/campaign-manager/promotions" active={(this.props.location.pathname === '/admin/campaign-manager/promotions')}>
             { t('CAMPAIGN_MANAGER.promotions') }
           </NavLink>
         </NavItem>
       </Nav>

        <Switch>
          <Route exact path="/admin/campaign-manager/clients" component={Clients}/>
          <Route exact path="/admin/campaign-manager/client-campaigns" component={ClientCampaigns}/>
          <Route exact path="/admin/campaign-manager/promotions" component={Promotions}/>
          <Redirect to='/admin/campaign-manager/client-campaigns'/>
        </Switch>

      </Container>
    )}</I18n>);
  }
}

export default CampaignManager;
