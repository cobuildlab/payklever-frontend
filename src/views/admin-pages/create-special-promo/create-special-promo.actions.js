import Flux from '@4geeksacademy/react-flux-dash';
import { postData, getData } from '../../../fetch';
import { CreateSpecialPromoForm } from './create-special-promo.classes';
import { createSpecialPromoValidator } from './create-special-promo.validators';

const createSpecialPromo = (createSpecialPromoForm: CreateSpecialPromoForm) => {
  try {
    createSpecialPromoValidator(createSpecialPromoForm);

    postData('/promotion/special/', createSpecialPromoForm)
      .then((res) => {
        Flux.dispatchEvent('createSpecialPromo', res);
      })
      .catch((err) => {
        Flux.dispatchEvent('PromotionStoreError', err);
      });
  } catch (err) {
    Flux.dispatchEvent('PromotionStoreError', err);
  }
}

const searchUsers = (query) => {
  getData(`/auth/user?search=${query}`)
    .then((res) => {
      Flux.dispatchEvent('searchUsers', res);
    })
    .catch((err) => {
      Flux.dispatchEvent('PromotionStoreError', err);
    });
}

export { createSpecialPromo, searchUsers };
