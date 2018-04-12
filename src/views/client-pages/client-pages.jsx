import React from 'react';
import Flux from '@4geeksacademy/react-flux-dash';
import { Route, Redirect } from "react-router-dom";
import {
  Navbar,
  NavbarBrand
} from 'reactstrap';
import {
  ClientManager
} from './';

class ClientPages extends Flux.View {
  render() {
    if (this.props.match.isExact) {
      return <Redirect to="/client/client-manager" />
    }

    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand>Payklever Client</NavbarBrand>
        </Navbar>

        <Route exact path="/client/client-manager" component={ClientManager}/>
      </div>
    );
  }
}

export default ClientPages;
