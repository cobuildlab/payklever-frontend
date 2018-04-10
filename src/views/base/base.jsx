import React from 'react';
import Flux from '@4geeksacademy/react-flux-dash';
import { Route, Redirect } from "react-router-dom";
import {
  Navbar,
  NavbarBrand
} from 'reactstrap';
import {
  CampaignManager
} from '../index';

class Base extends Flux.View {
  render() {
    if (this.props.match.isExact) {
      return <Redirect to="/pages/campaign-manager" />
    }

    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand>Payklever</NavbarBrand>
        </Navbar>

        <Route exact path="/pages/campaign-manager" component={CampaignManager}/>
      </div>
    );
  }
}

export default Base;
