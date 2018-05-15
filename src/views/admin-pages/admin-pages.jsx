import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import { MainNav } from '../components';
import {
  Navbar,
  NavbarBrand
} from 'reactstrap';
import {
  CampaignManager,
  CampaignDetails,
  ClientDetails,
} from './';


class AdminPages extends Component {
  render() {
    if (this.props.match.isExact) {
      return <Redirect to="/admin/campaign-manager" />
    }
    return (
      <div>
      <MainNav></MainNav>
      <Route path="/admin/campaign-manager" component={CampaignManager}/>
      <Route exact path="/admin/campaign-details/:campaignId" component={CampaignDetails}/>
      <Route exact path="/admin/client-details" component={ClientDetails}/>
    </div>
    );
  }
}

export default AdminPages;
