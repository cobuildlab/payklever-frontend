import React from 'react';
import Flux from '@4geeksacademy/react-flux-dash';
import { Route, Redirect } from "react-router-dom";
import {
  Navbar,
  NavbarBrand
} from 'reactstrap';
import {
  Campaigns,
  CreateAccount,
  CreatePayment,
  CreateCampaign,
  Profile,
} from './';

class ClientPages extends Flux.View {
  render() {
    if (this.props.match.isExact) {
      return <Redirect to="/client/campaigns" />
    }

    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand>Payklever Client</NavbarBrand>
        </Navbar>

        <Route exact path="/client/campaigns" component={Campaigns}/>
        <Route exact path="/client/create-account" component={CreateAccount}/>
        <Route exact path="/client/create-payment" component={CreatePayment}/>
        <Route exact path="/client/create-campaign" component={CreateCampaign}/>
        <Route path="/client/profile" component={Profile}/>
      </div>
    );
  }
}

export default ClientPages;
