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
  Button,
  Media,
} from 'reactstrap';
import {
  GreenLogo,
  GearImg,
  Avatar,
  Camp,
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
                   <NavItem style={{ backgroundImage: `url(${ Avatar })`}} className="avatar">
                     <NavLink href="https://github.com/reactstrap/reactstrap">
                     </NavLink>
                   </NavItem>
                   <NavItem style={{ backgroundImage: `url(${ GreenLogo })`}} className="camp">
                    <NavLink href="https://github.com/reactstrap/reactstrap">
                    </NavLink>
                   </NavItem>
                 </DropdownToggle>
                 <DropdownMenu className="m-0 p-0" right>
                   <DropdownItem className="header-dropdown" tag={Link} to="/client/profile/accounts">
                   <Media>
                      <Media left href="#">
                        <div className="img-account" style={{ backgroundImage: `url(${ Avatar })`}}></div>
                      </Media>
                      <Media body>
                        <p className="m-0">Lorm Ipsum</p>
                        <p>loremipsum@emailcom</p>
                      </Media>
                    </Media>
                   </DropdownItem>
                   <DropdownItem className="sub-header-dropdown">
                     <Media>
                        <Media left href="#">
                          <div className="img-account" style={{ backgroundImage: `url(${ Avatar })`}}></div>
                        </Media>
                        <Media body>
                          <p className="m-0">Lorm Ipsum</p>
                          <p>loremipsum@emailcom</p>
                        </Media>
                      </Media>
                   </DropdownItem>
                   <DropdownItem className="m-0" divider />
                 <DropdownItem className="sub-header-dropdown">
                     <Media>
                        <Media left href="#">
                          <div className="img-account" style={{ backgroundImage: `url(${ Avatar })`}}></div>
                        </Media>
                        <Media body>
                          <p className="m-0">Lorm Ipsum</p>
                          <p>loremipsum@emailcom</p>
                        </Media>
                      </Media>
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
