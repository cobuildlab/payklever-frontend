import React, { Component } from 'react';
import { SubNav } from '../../components';
import {
  authStore,
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
  Media,
} from 'reactstrap';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      user: authStore.getUser(),
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
           <Col md={{ size: 12,}}>
             {this.state.user && (
               <div>
                 <Media>
                    <Media left href="#">
                      <Media object data-src="holder.js/64x64" alt="Generic placeholder image" />
                    </Media>
                    <Media body>
                      <Media heading>
                        {this.state.user.firstName && (<div>
                          { t('PROFILE.nameAndSurname') } { ': ' }
                          { ` ${this.state.user.firstName} ${this.state.user.lastName}` }
                        </div>)}
                      </Media>
                      {this.state.user.email && (<div>
                        { t('PROFILE.email') }
                        {this.state.user.email}
                      </div>)}
                    </Media>
                  </Media>


               </div>
             )}
           </Col>
         </Row>

         <Nav tabs className="nav mt-4">
          <NavItem className="tabs-profile">
            <NavLink tag={Link} to="/client/profile/accounts" active={(this.props.location.pathname === '/client/profile/accounts')}>
              { t('PROFILE.accounts') }
            </NavLink>
          </NavItem>
          <NavItem className="tabs-profile">
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
