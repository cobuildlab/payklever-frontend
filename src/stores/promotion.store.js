import Flux from '@4geeksacademy/react-flux-dash';

class PromotionStore extends Flux.DashStore {
  constructor() {
    super();

    /**
     * Notifies when the promotion list was loaded
     * @param {Array}  promotions the promotions list
     */
    this.addEvent('getPromotions');

    /**
     * Notifies when the user list was loaded
     * @param {Array}  users the users list
     */
    this.addEvent('searchUsers');

    /**
     * Notifies when a promotion was created
     * @param {object}  promotion the created promotion
     */
    this.addEvent('createCouponPromo');

    /**
     * Notifies when a promotion was created
     * @param {object}  promotion the created promotion
     */
    this.addEvent('createSpecialPromo');

    /**
     * Error handler
     * @param {Error} err the error from the action
     */
    this.addEvent('PromotionStoreError');
  }
}

const promotionStore = new PromotionStore();

export default promotionStore;
