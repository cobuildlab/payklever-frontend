import Flux from '@4geeksacademy/react-flux-dash';

class InvoiceStore extends Flux.DashStore {
  constructor() {
    super();

    /**
     * Notifies when the invoice list was loaded
     * @param {Array}  invoices the invoice list
     */
    this.addEvent('getInvoices');


    /**
     * Notifies when an invoice was loaded
     * @param {object}  invoice the invoice
     */
    this.addEvent('getInvoice');

    /**
     * Error handler
     * @param {Error} err the error from the action
     */
    this.addEvent('InvoiceStoreError');
  }
}

const invoiceStore = new InvoiceStore();

export default invoiceStore;
