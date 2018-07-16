import Flux from '@4geeksacademy/react-flux-dash';
import { getData } from '../../../fetch';

const getPromotion = (promotionId) => {
  getData(`/promotion/${promotionId}/`)
    .then((promotion) => {
      Flux.dispatchEvent('getPromotion', promotion);
    })
    .catch((err) => {
      Flux.dispatchEvent('PromotionStoreError', err);
    });
}

export { getPromotion };
