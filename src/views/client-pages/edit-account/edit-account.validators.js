import * as utils from '../../../utils';
import { i18next } from '../../../i18n';
import { createAccountValidator } from '../create-account/create-account.validators';

const editAccountValidator = (createAccountForm: CreateAccountForm, accountId) => {
  if (!utils.isValidInteger(accountId)) {
    throw new Error(i18next.t('CREATE_ACCOUNT.invalidAccountId'));
  }

  try {
    createAccountValidator(createAccountForm)
  } catch (err) {
    throw err;
  }
}

export { editAccountValidator };
