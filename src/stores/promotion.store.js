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
     * Notifies when a promotion was loaded
     * @param {object}  promotion the promotion
     */
    this.addEvent('getPromotion');

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
     * Notifies when a promotion was resumed
     */
    this.addEvent('resumePromotion');

    /**
     * Notifies when a promotion was paused
     */
    this.addEvent('pausePromotion');

    /**
     * Error handler
     * @param {Error} err the error from the action
     */
    this.addEvent('PromotionStoreError');
  }
}

const promotionStore = new PromotionStore();

export default promotionStore;
