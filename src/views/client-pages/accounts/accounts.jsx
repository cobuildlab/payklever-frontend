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
} from 'reactstrap';
import { i18next } from '../../../i18n';
import { toast } from 'react-toastify';
import { BounceLoader } from 'react-spinners';
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
        <div hidden={!this.state.loading} className="App-overlay">
          <div style={{width: '200px'}} className="App-center-loading">
            <h4 className="text-center">
              { t('ACCOUNTS.loadingAccounts') }
            </h4>
            <BounceLoader size={200} color={'#75c044'} loading={this.state.loading}/>
          </div>
        </div>

        <Container className="mt-4">
          <Table>
             <tbody>
              { this.state.accounts.map((account) =>
              <tr key={account.id}>
                <td>{account.name}</td>
              <td className="text-right">
                  <Button color="danger" size="sm">
                    <FontAwesomeIcon icon={faTimes}/>
                  </Button>
                   {' '}
                  <Button color="primary" size="sm">
                   <FontAwesomeIcon icon={faEdit}/>
                  </Button>
                </td>
              </tr> )}
            </tbody>
          </Table>

          <Link to="/client/create-account">
            <Button className="d-block mx-auto mt-4" color="primary">
            { t('ACCOUNTS.addAccount') }
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
