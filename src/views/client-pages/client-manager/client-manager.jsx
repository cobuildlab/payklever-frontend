import React from 'react';
import Flux from '@4geeksacademy/react-flux-dash';
import './client-manager.css';
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

class ClientManager extends Flux.View {
  render() {
    return (
      <Container>
        <Row>
          <Col className="filter" md={{
              size: 12,
              padding: 0,
            }}>
            <Nav>
              <NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    All Campaigns
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
              </NavItem>
              <NavItem>
                <NavLink href="#">Link</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Another Link</NavLink>
              </NavItem>
              <NavItem>
                <NavLink disabled href="#">Disabled Link</NavLink>
              </NavItem>
            </Nav>
            <hr />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ClientManager;
