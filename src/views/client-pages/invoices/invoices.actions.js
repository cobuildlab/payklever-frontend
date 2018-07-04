import Flux from '@4geeksacademy/react-flux-dash';
import { getData } from '../../../fetch';

const getInvoices = (accountId, page) => {
  getData(`/invoice/?accountId=${accountId}&page=${page}`)
    .then((invoices) => {
      Flux.dispatchEvent('getInvoices', invoices);
    })
    .catch((err) => {
      Flux.dispatchEvent('InvoiceStoreError', err);
    });
}

export { getInvoices };
