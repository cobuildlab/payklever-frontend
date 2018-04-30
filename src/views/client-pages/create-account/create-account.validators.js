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

  if (!utils.isValidString(createAccountForm.paymediaId)) {
    throw new Error(i18next.t('CREATE_ACCOUNT.selectPaymentMethod'));
  }

  if (!utils.isValidNumber(createAccountForm.paymediaId)) {
    throw new Error(i18next.t('CREATE_ACCOUNT.invalidPaymedia'));
  }

  if (!createAccountRegExp.validName.test(createAccountForm.name)) {
    throw new Error(`${i18next.t('CREATE_ACCOUNT.accountName')}: ${i18next.t('CREATE_ACCOUNT.invalidName')}`);
  }
}

/*
Availity reactstrap Validation
 */
const createAccountAvForm = {
  name: {
    required: true,
    minLength: { value: 4 },
    maxLength: { value: 10 },
    pattern: { value: createAccountRegExp.validName }
  },
  paymediaId: {
    required: true,
    number: true,
    min: { value: 1 },
  },
}

export { createAccountValidator, createAccountAvForm };
