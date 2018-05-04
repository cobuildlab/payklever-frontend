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
  Dropdown,
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
import { i18next } from '../../../i18n';
import { toast } from 'react-toastify';
import { accountStore } from '../../../stores';
import { CSSTransition } from 'react-transition-group';
import * as AccountsActions from '../../client-pages/accounts/accounts.actions';

class MainNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      accountsOpen: false,
      profileOpen: false,
      loading: false,
      accounts: [],
      account: {},
    };

    this.toggle = this.toggle.bind(this);
    this.toggleAccounts = this.toggleAccounts.bind(this);
    this.toggleProfile = this.toggleProfile.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.getAccountsSubscription = accountStore
      .subscribe('getAccounts', (accounts) => {
        this.setState({ accounts });
        this.isLoading(false);
      });

    this.changeAccountSubscription = accountStore
      .subscribe('changeAccount', (account) => {
        this.setState({ account });
      });

    this.accountStoreError = accountStore
      .subscribe('AccountStoreError', (err) => {
        this.isLoading(false);
        toast.dismiss();
        toast.error(err.message || i18next.t('FETCH.error'));
      });

    AccountsActions.getAccounts();
  }

  componentWillUnmount() {
    this.getAccountsSubscription.unsubscribe();
    this.changeAccountSubscription.unsubscribe();
    this.accountStoreError.unsubscribe();
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

               <CSSTransition in={this.state.accounts.length > 0} timeout={500} classNames="fade-in" unmountOnExit>
               <Dropdown isOpen={this.state.accountsOpen} toggle={this.toggleAccounts} nav inNavbar>
                 <DropdownToggle onClick={this.toggleAccounts} nav>
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
                   {this.state.accounts.map((account) => <DropdownItem onClick={this.changeAccount(account)} key={account.id} className="header-dropdown">
                   <Media>
                      <Media left href="#">
                        <div className="img-account" style={{ backgroundImage: `url(${account.avatar || Avatar} )`}}></div>
                      </Media>
                      <Media body>
                        <p className="m-0">Lorm Ipsum</p>
                        <p>loremipsum@emailcom</p>
                      </Media>
                    </Media>
                   </DropdownItem>)}
                 </DropdownMenu>
               </Dropdown>
               </CSSTransition>

               <Dropdown isOpen={this.state.profileOpen} toggle={this.toggleProfile} nav inNavbar>
                 <DropdownToggle onClick={this.toggleProfile} nav className="mt-3">
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
               </Dropdown>

             </Nav>
           </Collapse>
          </Container>
       </Navbar>
    )}</I18n>);
  }

  logout() {
    mainNavActions.logout();
  }

  changeAccount(account) {
    console.log('changeAccount');
    mainNavActions.changeAccount(account);
  }

  toggle() {
    if (this.state.loading) return;

    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  toggleAccounts() {
    if (this.state.loading || !this.state.account.length) return;

    this.setState({
      accountsOpen: !this.state.accountsOpen,
    });
  }

  toggleProfile() {
    if (this.state.loading) return;

    this.setState({
      profileOpen: !this.state.profileOpen,
    });
  }

  isLoading(isLoading) {
    this.setState({ loading: isLoading });
  }
}

export default MainNav;
