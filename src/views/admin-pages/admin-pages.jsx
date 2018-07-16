import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import { MainNav, Footer } from '../components';
import {
  CampaignManager,
  CampaignDetails,
  ClientDetails,
  PromotionDetails,
  CreateCouponPromo,
  CreateSpecialPromo,
} from './';


class AdminPages extends Component {
  render() {
    if (this.props.match.isExact) {
      return <Redirect to="/admin/campaign-manager" />
    }
    return (
      <div>
      <MainNav></MainNav>

      <Switch>
        <Route path="/admin/campaign-manager" component={CampaignManager}/>
        <Route exact path="/admin/campaign-details/:campaignId" component={CampaignDetails}/>
        <Route exact path="/admin/client-details/:userId" component={ClientDetails}/>
        <Route exact path="/admin/promotion-details/:promotionId" component={PromotionDetails}/>
        <Route exact path="/admin/create-coupon-promo" component={CreateCouponPromo}/>
        <Route exact path="/admin/create-special-promo" component={CreateSpecialPromo}/>
        <Redirect to='/admin/campaign-manager'/>
      </Switch>

      <Footer></Footer>
    </div>
    );
  }
}

export default AdminPages;
