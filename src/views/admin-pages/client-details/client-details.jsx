import React, { Component } from 'react';
import {
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { i18next } from '../../../i18n';
import { toast } from 'react-toastify';
import { SubNav, Loading } from '../../components';
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
  Table,
} from 'reactstrap';
import { Avatar } from '../../../assets';
import { userStore, accountStore } from '../../../stores';
import * as ClientDetailsActions from './client-details.actions';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class ClientDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      loadingI18n: '',
      userId: props.match.params.userId || '',
      user: {},
      accounts: [],
    };
  }

  componentDidMount() {
    this.getUserSubscription = userStore
      .subscribe('getUser', (user) => {
        this.setState({ user });
        this.isLoading(false);
      });

    this.getAccountsSubscription = accountStore
      .subscribe('getAccounts', (accounts) => {
        this.setState({ accounts });
      });

    this.userStoreError = userStore
      .subscribe('UserStoreError', (err) => {
        this.isLoading(false);
        toast.dismiss();
        toast.error(err.message || i18next.t('FETCH.error'));
      });

    this.accountStoreError = accountStore
      .subscribe('AccountStoreError', (err) => {
        this.isLoading(false);
        toast.dismiss();
        toast.error(err.message || i18next.t('FETCH.error'));
      });

    setTimeout(() => {
      this.isLoading(true, 'CLIENT_DETAILS.loadingClient');
      ClientDetailsActions.getUser(this.state.userId);
      // TODO: getAccounts
    });
  }

  componentWillUnmount() {
    this.getUserSubscription.unsubscribe();
    this.getAccountsSubscription.unsubscribe();
    this.userStoreError.unsubscribe();
    this.accountStoreError.unsubscribe();
  }

  render() {
    return (<I18n>{(t, { i18n }) => (<div>
      <SubNav backRoute="/admin/campaign-manager/clients" subNavTitle={t('CLIENT_DETAILS.clientDetails')}></SubNav>

      <Loading isLoading={this.state.loading} loadingMessage={ t(this.state.loadingI18n) }></Loading>

      <Container>
        <Media className="mt-5">
          <Media left>
            <Media className="App-img-media-item" style={{ backgroundImage: `url(${ this.state.user.profileUrl || Avatar })`}}/>
          </Media>
          <Media body>
            <Media heading>
              {this.state.user.firstName} {' '} {this.state.user.lastName}
            </Media>
            {this.state.user.email}
          </Media>
        </Media>

        <Table className="mt-4">
       <thead className="text-center">
         <tr>
           <th>{t('CLIENT_DETAILS.accounts')}</th>
         </tr>
       </thead>
       <tbody>
         <TransitionGroup component={null}>
          { this.state.accounts.map((account) =>
            <CSSTransition key={account.id} timeout={500} classNames="fade-in">
              <tr>
                <td>
                  <Media>
                    <Media left href="#">
                      <Media className="App-img-media-item" style={{ backgroundImage: `url(${ Avatar })`}}/>
                    </Media>
                    <Media body>
                      <Media heading>
                        {account.name}
                      </Media>
                      {account.location}
                    </Media>
                  </Media>
                </td>
              </tr>
            </CSSTransition>)}
         </TransitionGroup>
       </tbody>
     </Table>
      </Container>
    </div>)}</I18n>);
  }

  isLoading = (isLoading, loadingI18n = this.state.loadingI18n) => {
    this.setState({
      loadingI18n,
      loading: isLoading
    });
  }
}
export default ClientDetails;
