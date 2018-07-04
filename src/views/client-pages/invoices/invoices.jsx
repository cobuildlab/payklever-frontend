import React, { Component } from 'react';
import {
  I18n
} from 'react-i18next';
import { i18next } from '../../../i18n';
import { toast } from 'react-toastify';
import {
  Container,
  Table,
} from 'reactstrap';
import {
  Link
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import * as invoicesActions from './invoices.actions';
import { invoiceStore, accountStore } from '../../../stores';
import { Loading, PaginationComponent } from '../../components';

class Invoices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      loadingI18n: '',
      invoices: {},
    };
  }

  componentDidMount() {
    this.getInvoicesSubscription = invoiceStore
      .subscribe('getInvoices', (invoices) => {
        this.setState({ invoices });
        this.isLoading(false);
      });

    this.changeAccountSubscription = accountStore
      .subscribe('changeAccount', (account) => {
        this.isLoading(true, 'INVOICES.loadingInvoices');
        invoicesActions.getInvoices(account.id, 0);
      });

    this.invoiceStoreError = invoiceStore
      .subscribe('InvoiceStoreError', (err) => {
        this.isLoading(false);
        toast.dismiss();
        toast.error(err.message || i18next.t('FETCH.error'));
      });

    this.reloadInvoices(0);
  }

  componentWillUnmount() {
    this.getInvoicesSubscription.unsubscribe();
    this.changeAccountSubscription.unsubscribe();
    this.invoiceStoreError.unsubscribe();
  }

  render() {
    return (<I18n>{(t, { i18n }) => (
      <div>

      <Loading isLoading={this.state.loading} loadingMessage={ t(this.state.loadingI18n) }></Loading>

       <Container className="mt-4 p-0">
         <Table hover>
            <thead>
              <tr>
                <th>{ t('CLIENT_CAMPAIGNS.campaignName') }</th>
                <th>{ t('INVOICES.smsSent') }</th>
                <th>{ t('INVOICES.smsPrice') }</th>
                <th>{ t('INVOICES.tax') }</th>
                <th>{ t('INVOICES.subTotal') }</th>
                <th>{ t('INVOICES.total') }</th>
              </tr>
            </thead>
            <tbody>
            <TransitionGroup component={null}>
             { (this.state.invoices.rows && this.state.invoices.rows.length) ? this.state.invoices.rows.map((invoice) =>
               <CSSTransition key={invoice.id} timeout={500} classNames="fade-in-change">
                 <tr className="App-cursor-pointer" onClick={() => this.goToInvoiceDetails(invoice.id)}>
                   <td>
                     {(invoice.Campaign && invoice.Campaign.name) ?
                       <span>{invoice.Campaign.name}</span>
                     : null}
                   </td>
                   <td>{invoice.smsSent}</td>
                   <td>{`$${invoice.smsPrice}`}</td>
                   <td>{`$${invoice.tax}`}</td>
                   <td>{`$${invoice.subTotal}`}</td>
                   <td>{`$${invoice.total}`}</td>
                 </tr>
               </CSSTransition>)
             : null }
            </TransitionGroup>
           </tbody>
         </Table>

         <PaginationComponent pages={this.state.invoices.pages} page={this.state.invoices.page} onPageChange={this.reloadInvoices}></PaginationComponent>

       </Container>
      </div>
    )}</I18n>);
  }

  reloadInvoices = (page) => {
    const account = accountStore.getAccount();
    if (account.id) {
      this.isLoading(true, 'INVOICES.loadingInvoices');
      invoicesActions.getInvoices(account.id, page);
    }
  }

  goToInvoiceDetails = (InvoiceId) => {
    this.props.history.push(`/client/invoice-details/${InvoiceId}`);
  }

  isLoading = (isLoading, loadingI18n = this.state.loadingI18n) => {
    this.setState({
      loadingI18n,
      loading: isLoading
    });
  }
}

export default Invoices;
