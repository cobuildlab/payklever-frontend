import React, { Component } from 'react';
import {
  Link,
} from "react-router-dom";
import {
  I18n
} from 'react-i18next';
import * as mainNavActions from './main-nav.actions.js'
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from 'reactstrap';
import {
  GreenLogo,
  GearImg,
  Avatar,
} from '../../../assets';

class MainNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
  }

  render() {
    return (<I18n>{(t, { i18n }) => (
        <Navbar color="white" light expand="md">
          <Container>
         <NavbarBrand tag={Link} to="/client/campaigns">
             <img src={GreenLogo} width="180" alt="payklever"/>
         </NavbarBrand>
         <NavbarToggler onClick={this.toggle} />
           <Collapse isOpen={this.state.isOpen} navbar>
             <Nav className="ml-auto" navbar>
               <NavItem className="mt-3 mr-3">
                 <Button outline color="success">
                   { t('MAIN_NAV.rules') }
                 </Button>
               </NavItem>

               <UncontrolledDropdown nav inNavbar>
                 <DropdownToggle nav>
                   <NavItem className="avatar">
                     <NavLink href="https://github.com/reactstrap/reactstrap">
                     <img src={Avatar} width="25" alt="option"/>
                     </NavLink>
                   </NavItem>
                   <NavItem className="camp">
                    <NavLink href="https://github.com/reactstrap/reactstrap">
                    </NavLink>
                   </NavItem>
                 </DropdownToggle>
                 <DropdownMenu right>
                   <DropdownItem tag={Link} to="/client/profile/accounts">
                     { t('MAIN_NAV.profile') }
                   </DropdownItem>
                   <DropdownItem divider />
                   <DropdownItem onClick={this.logout}>
                     { t('MAIN_NAV.logout') }
                   </DropdownItem>
                 </DropdownMenu>
               </UncontrolledDropdown>
               <UncontrolledDropdown nav inNavbar>
                 <DropdownToggle nav className="mt-3">
                   <img src={GearImg} width="25" alt="option"/>
                 </DropdownToggle>
                 <DropdownMenu right>
                   <DropdownItem tag={Link} to="/client/profile/accounts">
                     { t('MAIN_NAV.profile') }
                   </DropdownItem>
                   <DropdownItem divider />
                   <DropdownItem onClick={this.logout}>
                     { t('MAIN_NAV.logout') }
                   </DropdownItem>
                 </DropdownMenu>
               </UncontrolledDropdown>
             </Nav>
           </Collapse>
          </Container>
       </Navbar>
    )}</I18n>);
  }

  logout() {
    mainNavActions.logout();
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
}

export default MainNav;
