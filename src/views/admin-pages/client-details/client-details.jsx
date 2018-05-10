import React, { Component } from 'react';
import {
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { i18next } from '../../../i18n';
import { toast } from 'react-toastify';
import { SubNav } from '../../components';
import {
  I18n
} from 'react-i18next';
// import { Clients, Campaigns, Messages } from '../';
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
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { RingLoader } from 'react-spinners';

class ClientDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      client: {
        firstName: 'Jose Agustin',
        lastName: 'Villalobos Vargas',
        email: 'jose@example.com'
      },
      accounts: [{
        name: 'Account2',
        location: 'location of the account1',
        id: '1',
      },{
        name: 'Account2',
        location: 'location of the account2',
        id: '2',
      }],
    };
  }

  render() {
    return (<I18n>{(t, { i18n }) => (<div>
      <SubNav backRoute="/admin/campaign-manager/clients" subNavtitle={t('CLIENT_DETAILS.clientDetails')}></SubNav>

      <Container>
        <Media className="mt-5">
          <Media left href="#">
            <Media className="App-img-media-item" style={{ backgroundImage: `url(${ Avatar })`}}/>
          </Media>
          <Media body>
            <Media heading>
              {this.state.client.firstName} {' '} {this.state.client.lastName}
            </Media>
            {this.state.client.email}
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

  isLoading = (isLoading) => {
    this.setState({ loading: isLoading });
  }
}
export default ClientDetails;
