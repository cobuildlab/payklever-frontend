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
  Table,
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { RingLoader } from 'react-spinners';

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

      <CSSTransition in={this.state.loading} timeout={500} classNames="fade-in" unmountOnExit>
        <div className="App-overlay">
          <div style={{width: '200px'}} className="App-center-loading">
            <h4 className="text-center">
                { t('CLIENTS.loadingClients') }
            </h4>
            <RingLoader size={200} color={'#75c044'} loading={true}/>
          </div>
        </div>
      </CSSTransition>

      <Container>
        <Table>
        <thead>
          <tr>
            <th>{ t('CLIENTS.firstName') }</th>
            <th>{ t('CLIENTS.lastName') }</th>
            <th>{ t('CLIENTS.email') }</th>
          </tr>
        </thead>
        <tbody>
          <TransitionGroup component={null}>
           { this.state.clients.map((client) =>
             <CSSTransition key={client.id} timeout={500} classNames="fade-in">
               <tr>
                 <td>{client.firstName}</td>
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
