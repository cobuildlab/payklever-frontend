import * as utils from '../../../utils';
import { i18next } from '../../../i18n';
import { CreatePaymentForm } from './create-payment.classes';
import * as createPaymentRegExp from './create-payment.reg-exp';

const createPaymentValidator = (createPaymentForm: CreatePaymentForm) => {
  if (!(createPaymentForm instanceof CreatePaymentForm)) {
    throw new Error(i18next.t('APP.invalidForm'))
  }

  // Validate nonEmpty
  if (!utils.isValidString(createPaymentForm.firstName)) {
    throw new Error(i18next.t('CREATE_PAYMENT.emptyFirstName'));
  }

  if (!utils.isValidString(createPaymentForm.lastName)) {
    throw new Error(i18next.t('CREATE_PAYMENT.emptyLastName'));
  }

  if (!utils.isValidString(createPaymentForm.cardNumber)) {
    throw new Error(i18next.t('CREATE_PAYMENT.emptyCardNumber'));
  }

  if (!utils.isValidString(createPaymentForm.expireMonth)) {
    throw new Error(i18next.t('CREATE_PAYMENT.emptyExpireMonth'));
  }

  if (!utils.isValidString(createPaymentForm.expireYear)) {
    throw new Error(i18next.t('CREATE_PAYMENT.emptyExpireYear'));
  }

  if (!utils.isValidString(createPaymentForm.securityCode)) {
    throw new Error(i18next.t('CREATE_PAYMENT.emptySecurityCode'));
  }

  if (!utils.isValidString(createPaymentForm.zipCode)) {
    throw new Error(i18next.t('CREATE_PAYMENT.emptyZipCode'));
  }

  // regExp validations
  if (!createPaymentRegExp.validFirstName.test(createPaymentForm.firstName)) {
    throw new Error(`${i18next.t('CREATE_PAYMENT.firstName')}: ${i18next.t('CREATE_PAYMENT.invalidFirstName')}`);
  }

  if (!createPaymentRegExp.validLastName.test(createPaymentForm.lastName)) {
    throw new Error(`${i18next.t('CREATE_PAYMENT.lastName')}: ${i18next.t('CREATE_PAYMENT.invalidLastName')}`);
  }

  if (!createPaymentRegExp.validCardNumber.test(createPaymentForm.cardNumber)) {
    throw new Error(i18next.t('CREATE_PAYMENT.invalidCardNumber'));
  }

  if (!createPaymentRegExp.validExpireMonth
    .test(createPaymentForm.expireMonth)) {
    throw new Error(i18next.t('CREATE_PAYMENT.invalidExpireMonth'));
  }

  if (!createPaymentRegExp.validExpireYear
    .test(createPaymentForm.expireYear)) {
    throw new Error(i18next.t('CREATE_PAYMENT.invalidExpireYear'));
  }

  if (!createPaymentRegExp.validSecurityCode
    .test(createPaymentForm.securityCode)) {
    throw new Error(i18next.t('CREATE_PAYMENT.invalidSecurityCode'));
  }

  if (!createPaymentRegExp.validZipCode.test(createPaymentForm.zipCode)) {
    throw new Error(`${i18next.t('CREATE_PAYMENT.zipCode')}: ${i18next.t('CREATE_PAYMENT.invalidZipCode')}`);
  }
}

/*
Availity reactstrap Validation
 */
const createPaymentAvForm = {
  firstName: {
    required: true,
    minLength: { value: 3 },
    maxLength: { value: 40 },
    pattern: { value: createPaymentRegExp.validFirstName }
  },
  lastName: {
    required: true,
    minLength: { value: 3 },
    maxLength: { value: 40 },
    pattern: { value: createPaymentRegExp.validFirstName }
  },
  cardNumber: {
    required: true,
    number: true,
    minLength: { value: 13 },
    maxLength: { value: 16 },
  },
  expireMonth: {
    required: true,
    number: true,
    minLength: { value: 2 },
    maxLength: { value: 2 },
    min: { value: 1 },
    max: { value: 12 },
  },
  expireYear: {
    required: true,
    number: true,
    minLength: { value: 2 },
    maxLength: { value: 2 },
  },
  securityCode: {
    required: true,
    number: true,
    minLength: { value: 3 },
    maxLength: { value: 4 },
  },
  zipCode: {
    required: true,
    minLength: { value: 4 },
    maxLength: { value: 12 },
  },
}

export { createPaymentValidator, createPaymentAvForm };
