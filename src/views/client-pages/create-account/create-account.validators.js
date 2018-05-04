import * as utils from '../../../utils';
import { i18next } from '../../../i18n';
import { CreateAccountForm } from './create-account.classes';
import * as createAccountRegExp from './create-account.reg-exp';

const createAccountValidator = (createAccountForm: CreateAccountForm) => {
  if (!(createAccountForm instanceof CreateAccountForm)) {
    throw new Error(i18next.t('APP.invalidForm'))
  }

  if (!utils.isValidString(createAccountForm.name)) {
    throw new Error(i18next.t('CREATE_ACCOUNT.emptyName'));
  }

  if (createAccountForm.paymediaId === null ||
    createAccountForm.paymediaId === undefined) {
    throw new Error(i18next.t('CREATE_ACCOUNT.selectPaymentMethod'));
  }

  if (!utils.isValidNumber(createAccountForm.paymediaId.toString())) {
    throw new Error(i18next.t('CREATE_ACCOUNT.invalidPaymedia'));
  }

  if (!createAccountRegExp.validName.test(createAccountForm.name)) {
    throw new Error(`${i18next.t('CREATE_ACCOUNT.accountName')}: ${i18next.t('CREATE_ACCOUNT.invalidName')}`);
  }

  if (!utils.isValidString(createAccountForm.location)) {
    throw new Error(i18next.t('CREATE_ACCOUNT.emptyLocation'));
  }

  if (!utils.isValidString(createAccountForm.city)) {
    throw new Error(i18next.t('CREATE_ACCOUNT.emptyCity'));
  }

  if (!utils.isValidString(createAccountForm.state)) {
    throw new Error(i18next.t('CREATE_ACCOUNT.emptyState'));
  }

  if (!utils.isValidString(createAccountForm.country)) {
    throw new Error(i18next.t('CREATE_ACCOUNT.emptyCountry'));
  }

  if (!utils.isValidString(createAccountForm.level2, true)) {
    throw new Error(i18next.t('CREATE_ACCOUNT.invalidLvl2'));
  }

  if (createAccountForm.latitude === null ||
    createAccountForm.latitude === undefined) {
    throw new Error(i18next.t('CREATE_ACCOUNT.emptyLatitude'));
  }

  if (createAccountForm.longitude === null ||
    createAccountForm.longitude === undefined) {
    throw new Error(i18next.t('CREATE_ACCOUNT.emptyLongitude'));
  }

  if (typeof(createAccountForm.latitude) !== 'number') {
    throw new Error(i18next.t('CREATE_ACCOUNT.invalidLatitude'));
  }

  if (typeof(createAccountForm.longitude) !== 'number') {
    throw new Error(i18next.t('CREATE_ACCOUNT.invalidLongitude'));
  }
}

/*
Availity reactstrap Validation
 */
const createAccountAvForm = {
  name: {
    required: true,
    minLength: { value: 6 },
    maxLength: { value: 40 },
    pattern: { value: createAccountRegExp.validName }
  },
  paymediaId: {
    required: true,
    number: true,
    min: { value: 1 },
  },
}

export { createAccountValidator, createAccountAvForm };
