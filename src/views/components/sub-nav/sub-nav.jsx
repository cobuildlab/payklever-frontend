import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faEdit,
  faCopy,
} from '@fortawesome/fontawesome-free-solid';
import PropTypes from 'prop-types';
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
  Container,
  Button,
} from 'reactstrap';

class SubNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
    this.hasLink = this.hasLink.bind(this);
  }

  render() {
    const hasLink = this.hasLink();

    return (<I18n>{(t, { i18n }) => (
      <div>
        <Navbar className="sub-nav" color="dark" dark expand="md">
          <Container>
            { (this.props.backRoute) ? (<Link to={this.props.backRoute}>
            <Button color="link"><FontAwesomeIcon icon={faArrowLeft}/></Button>
            </Link>)
            : null }
            <NavbarBrand className="text-light">{ this.props.subNavTitle }</NavbarBrand>
            { hasLink && (<NavbarToggler onClick={this.toggle} />) }
            { hasLink && (<Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
              {(this.props.navItemTitle && !this.props.navItemHidden) ?
                <NavItem className="mr-1" onClick={this.props.navItemFunc} tag={Button} color="primary" size="sm">
                {this.props.navItemTitle}{' '}
                  <FontAwesomeIcon icon={faEdit}/>
                </NavItem>
              : null }
              {(this.props.navItem2Title) ?
                <NavItem onClick={this.props.navItem2Func} tag={Button} color="primary" size="sm">
                  {this.props.navItem2Title}{' '}
                  <FontAwesomeIcon icon={faCopy}/>
                </NavItem>
              : null}
              </Nav>
            </Collapse>) }
          </Container>
        </Navbar>
      </div>
    )}</I18n>);
  }

  /**
   * Check if there is any link props
   * @return {Boolean} true if there is a link
   */
  hasLink() {
    if ((this.props.navItemTitle && !this.props.navItemHidden) || this.props.navItem2Title) {
      return true
    };

    return false;
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
}

SubNav.propTypes = {
  subNavTitle: PropTypes.string.isRequired,
  backRoute: PropTypes.string,
  navItemHidden: PropTypes.bool,
  navItemTitle: PropTypes.string,
  navItemFunc: PropTypes.func,
  navItem2Title: PropTypes.string,
  navItem2Func: PropTypes.func,
};

export default SubNav;
