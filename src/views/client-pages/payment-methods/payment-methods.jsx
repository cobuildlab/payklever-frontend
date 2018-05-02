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
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { RingLoader } from 'react-spinners';
import { Link } from "react-router-dom";
import { paymentStore } from '../../../stores';
import * as PaymentMethodsActions from './payment-methods.actions';

class PaymentMethods extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      paymentMethods: []
    };

    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.getPaymentsSubscription = paymentStore
      .subscribe('getPayments', (paymentMethods) => {
        this.setState({ paymentMethods });
        this.isLoading(false);
      });

    this.paymentStoreError = paymentStore
      .subscribe('PaymentStoreError', (err) => {
        this.isLoading(false);
        toast.dismiss();
        toast.error(err.message || i18next.t('FETCH.error'));
      });

    PaymentMethodsActions.getPaymentMethods();
  }

  componentWillUnmount() {
    this.getPaymentsSubscription.unsubscribe();
    this.paymentStoreError.unsubscribe();
  }

  render() {
    return (<I18n>{(t, { i18n }) => (
      <div>

        <CSSTransition in={this.state.loading} timeout={500} classNames="fade-in" unmountOnExit>
          <div className="App-overlay">
            <div style={{width: '200px'}} className="App-center-loading">
              <h4 className="text-center">
                { t('PAYMENT_METHODS.loadingPayments') }
              </h4>
              <RingLoader size={200} color={'#75c044'} loading={true}/>
            </div>
          </div>
        </CSSTransition>

        <Container className="mt-4">
        <Table>
          <thead>
            <tr>
              <th>{ t('PAYMENT_METHODS.user') }</th>
            <th>{ t('PAYMENT_METHODS.card') }</th>
              <th> </th>
            </tr>
          </thead>
           <tbody>
            <TransitionGroup component={null}>
            { this.state.paymentMethods.map((paymentMethod, index) =>
              <CSSTransition key={paymentMethod.id} timeout={500} classNames="fade-in">
              <tr>
                <td>
                  {paymentMethod.firstName} {' '} {paymentMethod.lastName}
                </td>
                <td>
                  {paymentMethod.cardNumber}
                </td>
                <td className="text-right">
                  <Button color="danger" size="sm">
                    <FontAwesomeIcon icon={faTimes}/>
                  </Button>
                   {' '}
                  <Button color="primary" size="sm">
                   <FontAwesomeIcon icon={faEdit}/>
                  </Button>
                </td>
              </tr>
            </CSSTransition>)}
            </TransitionGroup>
          </tbody>
        </Table>
          
        <div className="text-center">
          <Link to="/client/create-payment">
            <Button className="mr-2 mt-4" color="danger">
            { t('PAYMENT_METHODS.cancel')}
            </Button>
          </Link>
          <Link to="/client/create-payment">
            <Button className="mt-4" color="primary">
            { t('PAYMENT_METHODS.createPayment') }
            </Button>
          </Link>
        </div>
          
       </Container>
    </div>
    )}</I18n>);
  }

  isLoading(isLoading) {
    this.setState({ loading: isLoading });
  }
}

export default PaymentMethods;
