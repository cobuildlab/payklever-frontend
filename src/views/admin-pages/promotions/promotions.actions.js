import Flux from '@4geeksacademy/react-flux-dash';
import { getData } from '../../../fetch';

const getPromotions = (page, status) => {
  const statusfilter = (status) ? `&status=${status}` : '';

  getData(`/promotion/?page=${page}${statusfilter}`)
    .then((users) => {
      Flux.dispatchEvent('getPromotions', users);
    })
    .catch((err) => {
      Flux.dispatchEvent('PromotionStoreError', err);
    });
}

export { getPromotions };
