import React from 'react';
import Flux from '@4geeksacademy/react-flux-dash';
import { Route, Redirect } from "react-router-dom";
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
  PaykleverBg,
  GearImg,
  Camp,
  Avatar
} from '../../assets';
import {
  ClientManager
} from './';

class ClientPages extends Flux.View {
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
      return <Redirect to="/client/client-manager" />
    }

    return (
      <div>
        <Navbar color="white" light expand="md">
          <Container>
         <NavbarBrand>
           <img src={GreenLogo} width="180" alt="payklever"/>
         </NavbarBrand>
         <NavbarToggler onClick={this.toggle} />
           <Collapse isOpen={this.state.isOpen} navbar>
             <Nav className="ml-auto" navbar>
               <NavItem>
                 <Button outline color="success">Publication Rules</Button>
               </NavItem>
               {/* <NavItem className="camp">
                 <NavLink href="https://github.com/reactstrap/reactstrap">
              </NavLink>
               </NavItem>
               <NavItem className="avatar">
                 <NavLink href="https://github.com/reactstrap/reactstrap">
                 <img src={Avatar} width="25" alt="option"/>
                 </NavLink>
               </NavItem> */}
               <UncontrolledDropdown nav inNavbar>
                 <DropdownToggle nav>
                   <img src={GearImg} width="25" alt="option"/>
                 </DropdownToggle>
                 <DropdownMenu right>
                   <DropdownItem>
                     Option 1
                   </DropdownItem>
                   <DropdownItem>
                     Option 2
                   </DropdownItem>
                   <DropdownItem divider />
                   <DropdownItem>
                     Reset
                   </DropdownItem>
                 </DropdownMenu>
               </UncontrolledDropdown>
             </Nav>
           </Collapse>
          </Container>
       </Navbar>
        <Route exact path="/client/client-manager" component={ClientManager}/>

      </div>
    );
  }
}

export default ClientPages;
