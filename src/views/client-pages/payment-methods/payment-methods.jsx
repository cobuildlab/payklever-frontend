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
        <div hidden={!this.state.loading} className="App-overlay">
          <div style={{width: '200px'}} className="App-center-loading">
            <h4 className="text-center">
              { t('PAYMENT_METHODS.loadingPayments') }
            </h4>
            <BounceLoader size={200} color={'#75c044'} loading={this.state.loading}/>
          </div>
        </div>

        <Container className="mt-4">
        <Table>
           <tbody>
            { this.state.paymentMethods.map((paymentMethod, index) => <tr key={paymentMethod.id}>
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
            </tr> )}
          </tbody>
        </Table>

        <Link to="/client/create-payment">
          <Button className="d-block mx-auto mt-4" color="primary">
          { t('PAYMENT_METHODS.addPayment') }
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

export default PaymentMethods;
