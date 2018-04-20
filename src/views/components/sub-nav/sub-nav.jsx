import React from 'react';
import Flux from '@4geeksacademy/react-flux-dash';
import {
  Link,
} from "react-router-dom";
import {
  I18n
} from 'react-i18next';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  NavLink,
  Nav,
} from 'reactstrap';

class SubNav extends Flux.View {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
    this.hasLink = this.hasLink.bind(this);
  }

  render() {
    return (<I18n>{(t, { i18n }) => (
      <div>
        <Navbar color="dark" dark expand="sm">
          <NavbarBrand>{ t(this.props.titleI18n) }</NavbarBrand>
          { this.hasLink() && (<NavbarToggler onClick={this.toggle} />) }
          { this.hasLink() && (<Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to={this.props.link}>
                  { t(this.props.linkI18n) }
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>) }
        </Navbar>
      </div>
    )}</I18n>);
  }

  /**
   * Check if there is any link props
   * @return {Boolean} true if there is a link
   */
  hasLink() {
    if (this.props.link) return true;

    return false;
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
}

export default SubNav;
