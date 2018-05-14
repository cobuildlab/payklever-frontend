import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faEdit
} from '@fortawesome/fontawesome-free-solid';
import {
  I18n
} from 'react-i18next';
import {
  Container,
  Table,
  Button,
  ButtonGroup,
  Col,
  Row,
} from 'reactstrap';
import { i18next } from '../../../i18n';
import { toast } from 'react-toastify';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { RingLoader } from 'react-spinners';
import {
  Link
} from "react-router-dom";
import { ModalConfirm } from '../../components';
import { accountStore } from '../../../stores';
import * as AccountsActions from './accounts.actions';

class Accounts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      loadingI18n: '',
      selectedAccount: {},
      accounts: [],
      deleteAccountIsOpen: false,
    };
  }

  componentDidMount() {
    this.getAccountsSubscription = accountStore
      .subscribe('getAccounts', (accounts) => {
        this.setState({ accounts });
        this.isLoading(false);
      });

    this.deleteAccountSubscription = accountStore
      .subscribe('deleteAccount', (account) => {
        this.isLoading(false);
        toast.dismiss();
        toast.success(i18next.t('ACCOUNTS.accountDeleted'));
        AccountsActions.getAccounts();
      });

    this.accountStoreError = accountStore
      .subscribe('AccountStoreError', (err) => {
        this.isLoading(false);
        toast.dismiss();
        toast.error(err.message || i18next.t('FETCH.error'));
      });

    this.isLoading(true, 'ACCOUNTS.loadingAccounts');
    AccountsActions.getAccounts();
  }

  componentWillUnmount() {
    this.getAccountsSubscription.unsubscribe();
    this.deleteAccountSubscription.unsubscribe();
    this.accountStoreError.unsubscribe();
  }

  render() {
    return (<I18n>{(t, { i18n }) => (
      <div>

        <ModalConfirm isOpen={this.state.deleteAccountIsOpen} modalHeader={t('ACCOUNTS.deleteHeader')} modalBody={t('ACCOUNTS.deleteBody', { accountName: this.state.selectedAccount.name || ' ' } )}
        acceptI18n="ACCOUNTS.confirmDelete" confirm={this.deleteAccount} />

        <CSSTransition in={this.state.loading} timeout={500} classNames="fade-in" unmountOnExit>
          <div className="App-overlay">
            <div style={{width: '200px'}} className="App-center-loading">
              <h4 className="text-center">
                { t(this.state.loadingI18n) }
              </h4>
              <RingLoader size={200} color={'#75c044'} loading={true}/>
            </div>
          </div>
        </CSSTransition>

        <Container className="mt-5">
          <Table>
            <thead>
              <tr>
                <th>{ t('ACCOUNTS.name')}</th>
                <th>{ t('ACCOUNTS.status')}</th>
                <th> </th>
              </tr>
            </thead>
             <tbody>
              <TransitionGroup component={null}>
              { this.state.accounts.map((account) =>
                <CSSTransition key={account.id} timeout={500} classNames="fade-in">
                <tr>
                  <td>{account.name}</td>
                  <td> </td>
                  <td className="text-right">
                    <Button onClick={() => this.deleteAccount(false, account)} title={ t('ACCOUNTS.deleteAccount')} color="danger" size="sm">
                      <FontAwesomeIcon icon={faTimes}/>
                    </Button>
                     {' '}
                    <Link to={`/client/edit-account/${account.id}`}>
                     <Button title={ t('ACCOUNTS.editAccount')} color="primary" size="sm">
                      <FontAwesomeIcon icon={faEdit}/>
                     </Button>
                    </Link>
                  </td>

                </tr>

                </CSSTransition>)}
              </TransitionGroup>
            </tbody>
          </Table>

          <Link to="/client/create-account">
            <Button className="mx-auto d-block mt-4 mb-2" color="primary">
            { t('ACCOUNTS.createAccount') }
            </Button>
          </Link>

       </Container>
       </div>
    )}</I18n>);
  }

  /**
   * toggles the deleteAccount modal and deletes the account if you pass confirm = true
   * @param  {Boolean} [confirm=false] pass true from the ModalConfirm
   * component only to delete the account
   * @param  {[type]}  [account=undefined] to set the last selected account,
   * pass the account from the account's list
   */
  deleteAccount = (confirm = false, account = undefined) => {
    if (account) this.setState({ selectedAccount: account });

    this.setState({ deleteAccountIsOpen: !this.state.deleteAccountIsOpen });

    if (confirm === true) {
      this.isLoading(true, 'ACCOUNTS.deletingAccount');
      AccountsActions.deleteAccount(this.state.selectedAccount.id);
    }
  }

  isLoading = (isLoading, loadingI18n = this.state.loadingI18n) => {
    this.setState({
      loadingI18n,
      loading: isLoading
    });
  }
}

export default Accounts;
