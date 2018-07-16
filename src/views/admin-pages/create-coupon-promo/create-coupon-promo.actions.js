import Flux from '@4geeksacademy/react-flux-dash';
import { postData, getData } from '../../../fetch';
import { CreateCouponPromoForm } from './create-coupon-promo.classes';
import { createCouponPromoValidator } from './create-coupon-promo.validators';

const createCouponPromo = (createCouponPromoForm: CreateCouponPromoForm) => {
  try {
    createCouponPromoValidator(createCouponPromoForm);

    postData('/promotion/coupon/', createCouponPromoForm)
      .then((res) => {
        Flux.dispatchEvent('createCouponPromo', res);
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

export { createCouponPromo, searchUsers };
