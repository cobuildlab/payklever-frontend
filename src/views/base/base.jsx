import React from 'react';
import Flux from '@4geeksacademy/react-flux-dash';
import { Route, Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand
} from 'reactstrap';
import {
  CamPaignManager
} from '../index';

export class Base extends Flux.View {
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand>Payklever</NavbarBrand>
        </Navbar>

        <Link to="/pages/campaign-manager">Link to CamPaignManager</Link>

        <Route exact path="/pages/campaign-manager" component={CamPaignManager}/>
      </div>
    );
  }
}
