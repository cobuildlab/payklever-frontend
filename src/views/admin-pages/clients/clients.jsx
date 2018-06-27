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
import { Loading, PaginationComponent } from '../../components';

class Clients extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      clients: {},
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

    ClientsActions.getUsers(0);
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
           { (this.state.clients.rows && this.state.clients.rows.length) ? this.state.clients.rows.map((client) =>
             <CSSTransition key={client.id} timeout={500} classNames="fade-in-change">
               <tr>
                 <td>
                   <Link to={`/admin/client-details/${client.id}`}>
                     {client.firstName}
                   </Link>
                 </td>
                 <td>{client.lastName}</td>
                 <td>{client.email}</td>
               </tr>
             </CSSTransition>)
           : null }
          </TransitionGroup>
        </tbody>
      </Table>

      <PaginationComponent pages={this.state.clients.pages} page={this.state.clients.page} onPageChange={this.reloadClients}></PaginationComponent>

      </Container>
    </div>)}</I18n>);
  }

  reloadClients = (page) => {
    this.isLoading(true);
    ClientsActions.getUsers(page);
  }

  isLoading = (isLoading) => {
    this.setState({ loading: isLoading });
  }
}



export default Clients;
