import * as utils from '../../../utils';
import { i18next } from '../../../i18n';
import moment from 'moment';
import { CreateCouponPromoForm } from './create-coupon-promo.classes';
import * as createCouponPromoRegExp from './create-coupon-promo.reg-exp';

const createCouponPromoValidator = (createCouponPromoForm: CreateCouponPromoForm) => {
  if (!(createCouponPromoForm instanceof CreateCouponPromoForm)) {
    throw new Error(i18next.t('APP.invalidForm'))
  }

  /*
  Validate empty fields
   */
  if (!utils.isValidString(createCouponPromoForm.name)) {
    throw new Error(i18next.t('CREATE_PROMOTION.emptyName'));
  }

  if (!utils.isValidString(createCouponPromoForm.startDate)) {
    throw new Error(i18next.t('CREATE_PROMOTION.emptyStartDate'));
  }

  if (!utils.isValidString(createCouponPromoForm.endDate)) {
    throw new Error(i18next.t('CREATE_PROMOTION.emptyEndDate'));
  }

  if (!utils.isValidString(createCouponPromoForm.amount)) {
    throw new Error(i18next.t('CREATE_PROMOTION.emptyAmount'));
  }

  if (!utils.isValidString(createCouponPromoForm.type)) {
    throw new Error(i18next.t('CREATE_PROMOTION.emptyType'));
  }

  /*
   validate regExp (strings)
   */
  if (!createCouponPromoRegExp.validName.test(createCouponPromoForm.name)) {
    throw new Error(`${i18next.t('CREATE_PROMOTION.name')}: ${i18next.t('CREATE_PROMOTION.invalidName')}`);
  }

  if (createCouponPromoForm.description !== null &&
    createCouponPromoForm.description !== undefined) {
    if (!createCouponPromoRegExp.validDescription
      .test(createCouponPromoForm.description)) {
      throw new Error(`${i18next.t('CREATE_PROMOTION.description')}: ${i18next.t('CREATE_PROMOTION.invalidDescription')}`);
    }
  }

  if (!createCouponPromoRegExp.validAmount.test(createCouponPromoForm.amount)) {
    throw new Error(`${i18next.t('CREATE_PROMOTION.amount')}: ${i18next.t('CREATE_PROMOTION.invalidAmount')}`);
  }

  if (!createCouponPromoRegExp.validType.test(createCouponPromoForm.type)) {
    throw new Error(`${i18next.t('CREATE_PROMOTION.type')}: ${i18next.t('CREATE_PROMOTION.invalidType')}`);
  }

  /*
  validate list of ids (invalid or empty)
   */
  if (createCouponPromoForm.userId !== undefined &&
    createCouponPromoForm.userId !== '[]') {
    let userIdAsJson;
    try {
      userIdAsJson = JSON.parse(createCouponPromoForm.userId);
    } catch (err) {
      throw new Error(i18next.t('CREATE_PROMOTION.invalidUserIds'));
    }
    if (Array.isArray(userIdAsJson) === false) {
      throw new Error(i18next.t('CREATE_PROMOTION.invalidUserIds'));
    } else if (userIdAsJson.length > 0) {
      if (!userIdAsJson.every((element) => {
          return (Number.isInteger(element) && element > 0)
        })) {
        throw new Error(i18next.t('CREATE_PROMOTION.invalidUserIds'));
      }
    }
  } else throw new Error(i18next.t('CREATE_PROMOTION.emptyUserIds'));

  /*
  validate dates (moment)
   */
  if (!moment(createCouponPromoForm.startDate).isValid()) {
    throw new Error(i18next.t('CREATE_CAMPAIGN.invalidStartDate'));
  }

  if (!moment(createCouponPromoForm.endDate).isValid()) {
    throw new Error(i18next.t('CREATE_CAMPAIGN.invalidEndDate'));
  }
}


/*
Availity reactstrap Validation
 */
const createCouponPromoAvForm = {
  name: {
    required: true,
    minLength: { value: 6 },
    maxLength: { value: 40 },
    pattern: { value: createCouponPromoRegExp.validName }
  },
  description: {
    // required: true,
    minLength: { value: 10 },
    maxLength: { value: 60 },
    pattern: { value: createCouponPromoRegExp.validDescription }
  },
  startDate: {
    required: true,
  },
  endDate: {
    required: true,
  },
  amount: {
    required: true,
    number: true,
    minLength: { value: 1 },
    maxLength: { value: 5 },
  },
  type: {
    required: true,
    minLength: { value: 2 },
    maxLength: { value: 2 },
    pattern: { value: createCouponPromoRegExp.validType }
  },
}

export { createCouponPromoValidator, createCouponPromoAvForm };
