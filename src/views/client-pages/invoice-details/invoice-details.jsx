import React, { Component } from 'react';
import { i18next } from '../../../i18n';
import { toast } from 'react-toastify';
import { SubNav, Invoice, Loading } from '../../components';
import {
  I18n
} from 'react-i18next';
import {
  Container,
} from 'reactstrap';
import { invoiceStore } from '../../../stores';
import * as invoiceDetailsActions from './invoice-details.actions';

class InvoiceDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      loadingI18n: '',
      invoiceId: props.match.params.invoiceId || '',
      invoice: {},
    };
  }

  componentDidMount() {
    this.getInvoiceSubscription = invoiceStore
      .subscribe('getInvoice', (invoice) => {
        console.log('invoice: ', invoice)
        this.setState({ invoice });
        this.isLoading(false);
      });

    this.invoiceStoreError = invoiceStore
      .subscribe('InvoiceStoreError', (err) => {
        this.isLoading(false);
        toast.dismiss();
        toast.error(err.message || i18next.t('FETCH.error'));
      });

    setTimeout(() => {
      this.isLoading(true, 'INVOICE_DETAILS.loadingInvoice');
      invoiceDetailsActions.getInvoice(this.state.invoiceId);
    });
  }

  componentWillUnmount() {
    this.getInvoiceSubscription.unsubscribe();
    this.invoiceStoreError.unsubscribe();
  }

  render() {
    return (<I18n>{(t, { i18n }) => (<div>
      <SubNav backRoute="/client/profile/invoices" subNavTitle={t('INVOICE_DETAILS.invoiceDetails')}></SubNav>

      <Loading isLoading={this.state.loading} loadingMessage={ t(this.state.loadingI18n) }></Loading>

      <Container className="mt-5">

      <Invoice invoice={this.state.invoice}></Invoice>

      </Container>
    </div>)}</I18n>);
  }

  isLoading = (isLoading, loadingI18n = this.state.loadingI18n) => {
    this.setState({
      loadingI18n,
      loading: isLoading
    });
  }
}
export default InvoiceDetails;
