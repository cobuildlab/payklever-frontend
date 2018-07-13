import Flux from '@4geeksacademy/react-flux-dash';
import { postData } from '../../../fetch';
import { CreateCouponPromoForm } from './create-coupon-promo.classes';
import { createCouponPromoValidator } from './create-coupon-promo.validators';

const createCouponPromo = (createCouponPromoForm: CreateCouponPromoForm) => {
  try {
    createCouponPromoValidator(createCouponPromoForm);

    postData('/coupon/', createCouponPromoForm)
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

export { createCouponPromo };
