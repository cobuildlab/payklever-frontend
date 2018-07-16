import Flux from '@4geeksacademy/react-flux-dash';
import { getData } from '../../../fetch';

const getPromotions = (page) => {
  getData(`/promotion/?page=${page}`)
    .then((users) => {
      Flux.dispatchEvent('getPromotions', users);
    })
    .catch((err) => {
      Flux.dispatchEvent('PromotionStoreError', err);
    });
}

export { getPromotions };
