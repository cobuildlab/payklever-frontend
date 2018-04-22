import React from 'react';
import Flux from '@4geeksacademy/react-flux-dash';
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
import {
  Link
} from "react-router-dom";
import AccountsActions from './accounts.actions';

class Accounts extends Flux.View {
  constructor(props) {
    super(props);

    this.state = {
      accounts: [],
    };
  }

  componentDidMount() {
    AccountsActions.getAccounts()
      .then((accounts) => {
        this.setState({
          accounts,
        });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (<I18n>{(t, { i18n }) => (
        <Container className="mt-4">
          <Table>
             <tbody>
              { this.state.accounts.map((account) =>
              <tr key={account.id}>
                <td>{account.name}</td>
                <td>
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
    )}</I18n>);
  }
}

export default Accounts;
