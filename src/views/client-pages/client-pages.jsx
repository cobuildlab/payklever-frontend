import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import { MainNav } from '../components';
import {
  Campaigns,
  CreateAccount,
  CreatePayment,
  CreateCampaign,
  Profile,
} from './';

class ClientPages extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    if (this.props.match.isExact) {
      return <Redirect to="/client/campaigns" />
    }

    return (
      <div>
        <MainNav></MainNav>

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
