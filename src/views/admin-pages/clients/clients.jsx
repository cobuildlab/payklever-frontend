import React, { Component } from 'react';
import {
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { i18next } from '../../../i18n';
import { toast } from 'react-toastify';
import { userStore } from '../../../stores';
import * as ClientsActions from './clients.actions';
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
  Button,
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Loading } from '../../components';

class Clients extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      clients: [],
    };
  }

  componentDidMount() {
    this.getClientsSubscription = userStore
      .subscribe('getUsers', (clients) => {
        this.setState({ clients });
        this.isLoading(false);
      });

    this.userStoreError = userStore
      .subscribe('UserStoreError', (err) => {
        this.isLoading(false);
        toast.dismiss();
        toast.error(err.message || i18next.t('FETCH.error'));
      });

    ClientsActions.getUsers();
  }

  componentWillUnmount() {
    this.getClientsSubscription.unsubscribe();
    this.userStoreError.unsubscribe();
  }

  render() {
    return (<I18n>{(t, { i18n }) => (<div>

      <Loading isLoading={this.state.loading} loadingMessage={ t('CLIENTS.loadingClients') }></Loading>

      <Container className="p-0">
        <Table hover className="mt-5">
        <thead>
          <tr>
            <th className="App-header-table-admin">{ t('CLIENTS.firstName') }</th>
            <th className="App-header-table-admin">{ t('CLIENTS.lastName') }</th>
            <th className="App-header-table-admin">{ t('CLIENTS.email') }</th>
          </tr>
        </thead>
        <tbody>
          <TransitionGroup component={null}>
           { this.state.clients.map((client) =>
             <CSSTransition key={client.id} timeout={500} classNames="fade-in">
               <tr>
                 <td>
                   <Link to={`/admin/client-details/${client.id}`}>
                     {client.firstName}
                   </Link>
                 </td>
                 <td>{client.lastName}</td>
                 <td>{client.email}</td>
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



export default Clients;
