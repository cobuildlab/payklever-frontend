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
import { accountStore } from '../../../stores';
import * as AccountsActions from './accounts.actions';

class Accounts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      accounts: [],
    };

    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.getAccountsSubscription = accountStore
      .subscribe('getAccounts', (accounts) => {
        this.setState({ accounts });
        this.isLoading(false);
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
    this.accountStoreError.unsubscribe();
  }

  render() {
    return (<I18n>{(t, { i18n }) => (
      <div>

        <CSSTransition in={this.state.loading} timeout={500} classNames="fade-in" unmountOnExit>
          <div className="App-overlay">
            <div style={{width: '200px'}} className="App-center-loading">
              <h4 className="text-center">
                { t('ACCOUNTS.loadingAccounts') }
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
                    {/* <Button color="danger" size="sm">
                      <FontAwesomeIcon icon={faTimes}/>
                    </Button>
                     {' '} */}
                    <Link to={`/client/edit-account/${account.id}`}>
                     <Button title={t('ACCOUNTS.editAccount')} color="primary" size="sm">
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

  isLoading(isLoading) {
    this.setState({ loading: isLoading });
  }
}

export default Accounts;
