import * as utils from '../../../utils';
import { i18next } from '../../../i18n';
import moment from 'moment';
import { CreateSpecialPromoForm } from './create-special-promo.classes';
import * as createSpecialPromoRegExp from './create-special-promo.reg-exp';

const createSpecialPromoValidator = (createSpecialPromoForm: CreateSpecialPromoForm) => {
  if (!(createSpecialPromoForm instanceof CreateSpecialPromoForm)) {
    throw new Error(i18next.t('APP.invalidForm'))
  }

  /*
  Validate empty fields
   */
  if (!utils.isValidString(createSpecialPromoForm.name)) {
    throw new Error(i18next.t('CREATE_PROMOTION.emptyName'));
  }

  if (!utils.isValidString(createSpecialPromoForm.startDate)) {
    throw new Error(i18next.t('CREATE_PROMOTION.emptyStartDate'));
  }

  if (!utils.isValidString(createSpecialPromoForm.endDate)) {
    throw new Error(i18next.t('CREATE_PROMOTION.emptyEndDate'));
  }

  if (!utils.isValidString(createSpecialPromoForm.amount)) {
    throw new Error(i18next.t('CREATE_PROMOTION.emptyAmount'));
  }

  /*
   validate regExp (strings)
   */
  if (!createSpecialPromoRegExp.validName.test(createSpecialPromoForm.name)) {
    throw new Error(`${i18next.t('CREATE_PROMOTION.promotionName')}: ${i18next.t('CREATE_PROMOTION.invalidName')}`);
  }

  if (createSpecialPromoForm.description !== null &&
    createSpecialPromoForm.description !== undefined) {
    if (!createSpecialPromoRegExp.validDescription
      .test(createSpecialPromoForm.description)) {
      throw new Error(`${i18next.t('CREATE_PROMOTION.description')}: ${i18next.t('CREATE_PROMOTION.invalidDescription')}`);
    }
  }

  if (!createSpecialPromoRegExp.validAmount.test(createSpecialPromoForm.amount)) {
    throw new Error(`${i18next.t('CREATE_PROMOTION.amount')}: ${i18next.t('CREATE_PROMOTION.invalidSpecialAmount')}`);
  }

  /*
  validate list of ids (invalid or empty)
   */
  if (createSpecialPromoForm.userId !== undefined &&
    createSpecialPromoForm.userId !== '[]') {
    let userIdAsJson;
    try {
      userIdAsJson = JSON.parse(createSpecialPromoForm.userId);
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
  if (!moment(createSpecialPromoForm.startDate).isValid()) {
    throw new Error(i18next.t('CREATE_CAMPAIGN.invalidStartDate'));
  }

  if (!moment(createSpecialPromoForm.endDate).isValid()) {
    throw new Error(i18next.t('CREATE_CAMPAIGN.invalidEndDate'));
  }
}


/*
Availity reactstrap Validation
 */
const createSpecialPromoAvForm = {
  name: {
    required: true,
    minLength: { value: 6 },
    maxLength: { value: 40 },
    pattern: { value: createSpecialPromoRegExp.validName }
  },
  description: {
    // required: true,
    minLength: { value: 10 },
    maxLength: { value: 60 },
    pattern: { value: createSpecialPromoRegExp.validDescription }
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
}

export { createSpecialPromoValidator, createSpecialPromoAvForm };
