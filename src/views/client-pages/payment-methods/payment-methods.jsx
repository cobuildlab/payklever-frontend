import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faTimes,
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
import { Loading, ModalConfirm } from '../../components';
import { Link } from "react-router-dom";
import { paymentStore } from '../../../stores';
import * as PaymentMethodsActions from './payment-methods.actions';

class PaymentMethods extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      loadingI18n: '',
      paymentMethods: [],
      selectedPayment: {},
      deletePaymentIsOpen: false,
    };
  }

  componentDidMount() {
    this.getPaymentsSubscription = paymentStore
      .subscribe('getPayments', (paymentMethods) => {
        this.setState({ paymentMethods });
        this.isLoading(false);
      });

    this.deletePaymentSubscription = paymentStore
      .subscribe('deletePayment', (res) => {
        this.isLoading(false);
        toast.dismiss();
        toast.success(i18next.t('PAYMENT_METHODS.paymentDeleted'));
        this.reloadPayments();
      });

    this.paymentStoreError = paymentStore
      .subscribe('PaymentStoreError', (err) => {
        this.isLoading(false);
        toast.dismiss();
        toast.error(err.message || i18next.t('FETCH.error'));
      });

    this.reloadPayments();
  }

  componentWillUnmount() {
    this.getPaymentsSubscription.unsubscribe();
    this.deletePaymentSubscription.unsubscribe();
    this.paymentStoreError.unsubscribe();
  }

  render() {
    return (<I18n>{(t, { i18n }) => (
      <div>

        <Loading isLoading={this.state.loading} loadingMessage={ t(this.state.loadingI18n) }></Loading>

        <ModalConfirm isOpen={this.state.deletePaymentIsOpen} modalHeader={t('PAYMENT_METHODS.deleteHeader')} modalBody={t('PAYMENT_METHODS.deleteBody', { cardNumber: this.state.selectedPayment.cardNumber || ' ' } )}
        acceptI18n="PAYMENT_METHODS.deletePayment" confirm={this.deletePayment} />

        <Container className="mt-5">
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
                  <Button onClick={() => this.deletePayment(false, paymentMethod)} color="danger" size="sm">
                    <FontAwesomeIcon icon={faTimes}/>
                  </Button>
                </td>
              </tr>
            </CSSTransition>)}
            </TransitionGroup>
          </tbody>
        </Table>

        <Link to="/client/create-payment">
          <Button className="mx-auto d-block mt-4 mb-2" color="primary">
          { t('PAYMENT_METHODS.createPayment') }
          </Button>
        </Link>

       </Container>
    </div>
    )}</I18n>);
  }

  /**
   * toggles the deletePayment modal and delete the payment if you pass confirm = true
   * @param  {Boolean} [confirm=false] pass true from the ModalConfirm
   * component only to delete the payment
   * @param  {[type]}  [payment=undefined] to set the last selected
   *  paymentMethod,
   * pass the paymentMethod from the paymentMethod's list
   */
  deletePayment = (confirm = false, paymentMethod = undefined) => {
    if (paymentMethod) this.setState({ selectedPayment: paymentMethod });

    this.setState({ deletePaymentIsOpen: !this.state.deletePaymentIsOpen });

    if (confirm === true) {
      this.isLoading(true, 'PAYMENT_METHODS.deletingPayment');
      PaymentMethodsActions.deletePayment(this.state.selectedPayment.id);
    }
  }

  reloadPayments = () => {
    this.isLoading(true, 'PAYMENT_METHODS.loadingPayments')
    PaymentMethodsActions.getPaymentMethods();
  }

  isLoading = (isLoading, loadingI18n = this.state.loadingI18n) => {
    this.setState({
      loadingI18n,
      loading: isLoading
    });
  }
}

export default PaymentMethods;
