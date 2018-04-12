import React from 'react';
import Flux from '@4geeksacademy/react-flux-dash';
import { Route, Redirect } from "react-router-dom";
import {
  Navbar,
  NavbarBrand
} from 'reactstrap';
import {
  CampaignManager
} from './';

class AdminPages extends Flux.View {
  render() {
    if (this.props.match.isExact) {
      return <Redirect to="/admin/campaign-manager" />
    }

    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand>Payklever Admin</NavbarBrand>
        </Navbar>

        <Route exact path="/admin/campaign-manager" component={CampaignManager}/>
      </div>
    );
  }
}

export default AdminPages;
