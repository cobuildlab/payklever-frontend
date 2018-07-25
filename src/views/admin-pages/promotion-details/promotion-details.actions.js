import Flux from '@4geeksacademy/react-flux-dash';
import { getData, putData } from '../../../fetch';

const getPromotion = (promotionId) => {
  getData(`/promotion/${promotionId}/`)
    .then((promotion) => {
      Flux.dispatchEvent('getPromotion', promotion);
    })
    .catch((err) => {
      Flux.dispatchEvent('PromotionStoreError', err);
    });
}

const resumePromotion = (promotionId) => {
  putData(`/promotion/${promotionId}/resume/`)
    .then((promotion) => {
      Flux.dispatchEvent('resumePromotion', promotion);
    })
    .catch((err) => {
      Flux.dispatchEvent('PromotionStoreError', err);
    });
}

const pausePromotion = (promotionId) => {
  putData(`/promotion/${promotionId}/pause/`)
    .then((promotion) => {
      Flux.dispatchEvent('pausePromotion', promotion);
    })
    .catch((err) => {
      Flux.dispatchEvent('PromotionStoreError', err);
    });
}

export { getPromotion, resumePromotion, pausePromotion };
