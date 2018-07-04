import Flux from '@4geeksacademy/react-flux-dash';
import { getData } from '../../../fetch';

const getInvoice = (invoiceId) => {
  getData(`/invoice/${invoiceId}/`)
    .then((invoice) => {
      Flux.dispatchEvent('getInvoice', invoice);
    })
    .catch((err) => {
      Flux.dispatchEvent('InvoiceStoreError', err);
    });
}

export { getInvoice };
