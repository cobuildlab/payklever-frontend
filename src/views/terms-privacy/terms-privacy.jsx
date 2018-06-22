import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { Terms, PrivacyPolicy } from '../';
import {
  PaykleverBg,
} from '../../assets';
import {
  Container,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

class TermsPrivacy extends Component {
  componentDidMount() {
    document.body.style.backgroundImage = `url(${PaykleverBg})`;
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundAttachment = 'fixed';
  }

  componentWillUnmount() {
    document.body.style.backgroundImage = '';
    document.body.style.backgroundRepeat = '';
    document.body.style.backgroundPosition = '';
    document.body.style.backgroundSize = '';
    document.body.style.backgroundAttachment = '';
  }

  render() {
    return (
      <I18n>{(t, { i18n }) => (<Container>

      <Nav tabs className="nav mt-5">
       <NavItem className="App-tabs-50">
         <NavLink className={(this.props.location.pathname === '/terms-privacy/terms') ? null: "text-white"} tag={Link} to="/terms-privacy/terms"
         active={(this.props.location.pathname === '/terms-privacy/terms')}>
           { t('TERMS.terms') }
         </NavLink>
       </NavItem>
       <NavItem className="App-tabs-50">
         <NavLink className={(this.props.location.pathname === '/terms-privacy/privacy-policy') ? null: "text-white"} tag={Link} to="/terms-privacy/privacy-policy" active={(this.props.location.pathname === '/terms-privacy/privacy-policy')}>
           { t('PRIVACY_POLICY.privacyPolicy') }
         </NavLink>
       </NavItem>
     </Nav>

     <Switch>
       <Route exact path="/terms-privacy/terms" component={Terms}/>
       <Route exact path="/terms-privacy/privacy-policy" component={PrivacyPolicy}/>
       <Redirect to='/signup'/>
     </Switch>

    </Container> )}</I18n>)
  }

}

export default TermsPrivacy;
