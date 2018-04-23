import React from 'react';
import Flux from '@4geeksacademy/react-flux-dash';
import { SubNav } from '../../components';
import {
  AuthStore,
} from '../../../stores';
import { Accounts, PaymentMethods } from '../';
import {
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import {
  I18n
} from 'react-i18next';
import {
  Container,
  Col,
  Row,
  Nav,
  NavLink,
  NavItem,
} from 'reactstrap';

class Profile extends Flux.View {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      user: AuthStore.getUser(),
    };

    this.toggle = this.toggle.bind(this);
  }

  render() {
    if (this.props.match.isExact) {
      return <Redirect to="/client/profile/accounts" />
    }

    return (<I18n>{(t, { i18n }) => (
      <div>
        {/* link="/client/edit-profile" linkI18n="PROFILE.editProfile" */}
        <SubNav titleI18n="PROFILE.profile"></SubNav>

       <Container className="mt-4">
         <Row>
           <Col md={{ size: 6, }}>
             {/* TODO: profile img */}
           </Col>
           <Col md={{ size: 6, }}>
             {this.state.user && (
               <div>
                 <div>
                   Name and Surname:
                   { ` ${this.state.user.firstName} ${this.state.user.lastName}` }
                 </div>
                 <div>
                   Email:
                   { this.state.user.email }
                 </div>
               </div>
             )}
           </Col>
         </Row>

         <Nav tabs className="nav justify-content-center mt-4">
          <NavItem>
            <NavLink tag={Link} to="/client/profile/accounts" active={(this.props.location.pathname === '/client/profile/accounts')}>
              { t('PROFILE.accounts') }
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/client/profile/payment-methods" active={(this.props.location.pathname === '/client/profile/payment-methods')}>
              { t('PROFILE.paymentMethods') }
            </NavLink>
          </NavItem>
        </Nav>

         <Route exact path="/client/profile/accounts" component={Accounts}/>
         <Route exact path="/client/profile/payment-methods" component={PaymentMethods}/>

       </Container>
      </div>
    )}</I18n>);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
}

export default Profile;
