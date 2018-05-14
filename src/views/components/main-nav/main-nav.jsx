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
import { accountStore, authStore } from '../../../stores';
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
      user: authStore.getUser(),
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
        this.autoSelectAccount(accounts);
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

    setTimeout(() => {
      if (this.state.user.isAdmin === false) AccountsActions.getAccounts();
    })
  }

  componentWillUnmount() {
    this.getAccountsSubscription.unsubscribe();
    this.changeAccountSubscription.unsubscribe();
    this.accountStoreError.unsubscribe();
  }

  render() {
    const homeUrl = (this.state.user.isAdmin === true) ?
      '/admin/campaign-manager/client-campaigns' :
      '/client/campaigns';

    return (<I18n>{(t, { i18n }) => (
        <Navbar color="white" light expand="md">
          <Container>
         <NavbarBrand tag={Link} to={homeUrl}>
             <img src={GreenLogo} width="180" alt="payklever"/>
         </NavbarBrand>
         <NavbarToggler onClick={this.toggle} />
           <Collapse isOpen={this.state.isOpen} navbar>
             <Nav className="ml-auto" navbar>
               {(this.state.user.isAdmin === false) ? (
                 <NavItem className="mt-3 mr-3">
                 <Button outline color="success">
                   { t('MAIN_NAV.rules') }
                 </Button>
                </NavItem>)
                : null}

               <CSSTransition in={this.state.accounts.length > 0} timeout={500} classNames="fade-in" unmountOnExit>
               <Dropdown isOpen={this.state.accountsOpen} toggle={this.toggleAccounts} nav inNavbar>
                 <DropdownToggle onClick={() => this.toggleAccounts} nav>
                   <div style={{ backgroundImage: `url(${ Avatar })`}} className="avatar">
                   </div>
                   <div style={{ backgroundImage: `url(${ GreenLogo })`}} className="camp">
                   </div>
                 </DropdownToggle>

                 <DropdownMenu className="m-0 p-0" right>
                   {this.state.accounts.map((account, index) => <div key={account.id}>
                     <DropdownItem
                     onClick={() => {this.changeAccount(account)}} className={ (this.state.account.id === account.id) ? "header-dropdown" : "sub-header-dropdown"}>
                   <Media>
                      <Media left>
                        <div className="img-account" style={{ backgroundImage: `url(${account.avatar || Avatar} )`}}></div>
                      </Media>
                      <Media body>
                        <p className="mt-3">{ account.name }</p>
                      </Media>
                    </Media>
                   </DropdownItem>
                   { (index !== (this.state.accounts.length -1)) ?
                     (<DropdownItem divider></DropdownItem>)
                     : null}
                 </div>)}
                 </DropdownMenu>
               </Dropdown>
               </CSSTransition>

               <Dropdown isOpen={this.state.profileOpen} toggle={this.toggleProfile} nav inNavbar>
                 <DropdownToggle onClick={this.toggleProfile} nav className="mt-3">
                   <img src={GearImg} width="25" alt="option"/>
                 </DropdownToggle>
                 <DropdownMenu right>
                   {(this.state.user.isAdmin === false) ?
                   (<DropdownItem tag={Link} to="/client/profile/accounts">
                     { t('MAIN_NAV.profile') }
                   </DropdownItem>)
                   : null}
                   {(this.state.user.isAdmin === false) ?
                   <DropdownItem divider />
                   : null}
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

  autoSelectAccount = (accounts) => {
    if (!Array.isArray(accounts)) return;

    if (!this.state.account.id && accounts.length) {
      this.changeAccount(accounts[0]);
    } else if (this.state.account.id && !accounts.length) {
      this.changeAccount({});
    } else if (this.state.account.id && accounts.length) {
      let deleted = true;

      for (const account of accounts) {
        if (account.id === this.state.account.id) {
          this.changeAccount(accounts[0]);
          deleted = false;
        }
      }

      if (deleted) this.changeAccount(accounts[0])
    }
  }

  logout() {
    mainNavActions.logout();
  }

  changeAccount(account) {
    setTimeout(() => {
      mainNavActions.changeAccount(account);
    })
  }

  toggle() {
    if (this.state.loading) return;

    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  toggleAccounts() {
    if (this.state.loading || !this.state.accounts.length) return;

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
