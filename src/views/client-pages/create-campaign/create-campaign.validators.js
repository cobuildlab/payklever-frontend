import * as utils from '../../../utils';
import { i18next } from '../../../i18n';
import { CreateCampaignForm } from './create-campaign.classes';
import * as createCampaignRegExp from './create-campaign.reg-exp';

// TODO: validate new fields

const createCampaignValidator = (createCampaignForm: CreateCampaignForm) => {
  if (!(createCampaignForm instanceof CreateCampaignForm)) {
    throw new Error(i18next.t('APP.invalidForm'))
  }

  // Validate nonEmpty
  if (!utils.isValidString(createCampaignForm.name)) {
    throw new Error(i18next.t('CREATE_CAMPAIGN.emptyName'));
  }

  if (!utils.isValidString(createCampaignForm.messageTitle)) {
    throw new Error(i18next.t('CREATE_CAMPAIGN.emptyMessageTitle'));
  }

  if (!utils.isValidString(createCampaignForm.messageDescription)) {
    throw new Error(i18next.t('CREATE_CAMPAIGN.emptyMessageDescription'));
  }

  if (!utils.isValidString(createCampaignForm.messageDescription)) {
    throw new Error(i18next.t('CREATE_CAMPAIGN.emptyMessageDescription'));
  }

  // validate regExp
  if (!createCampaignRegExp.validCampaignName.test(createCampaignForm.name)) {
    throw new Error(`${i18next.t('CREATE_CAMPAIGN.name')}: ${i18next.t('CREATE_CAMPAIGN.invalidName')}`);
  }

  if (!createCampaignRegExp.validMessageTitle
    .test(createCampaignForm.messageTitle)) {
    throw new Error(`${i18next.t('CREATE_CAMPAIGN.messageTitle')}: ${i18next.t('CREATE_CAMPAIGN.invalidMessageTitle')}`);
  }

  if (!createCampaignRegExp.validMessageDescription
    .test(createCampaignForm.messageDescription)) {
    throw new Error(`${i18next.t('CREATE_CAMPAIGN.messageDescription')}: ${i18next.t('CREATE_CAMPAIGN.invalidMessageDescription')}`);
  }
}

/*
Availity reactstrap Validation
 */
const createCampaignAvForm = {
  name: {
    required: true,
    minLength: { value: 6 },
    maxLength: { value: 40 },
    pattern: { value: createCampaignRegExp.validCampaignName }
  },
  messageTitle: {
    required: true,
    minLength: { value: 6 },
    maxLength: { value: 40 },
    pattern: { value: createCampaignRegExp.validMessageTitle }
  },
  messageDescription: {
    required: true,
    minLength: { value: 40 },
    maxLength: { value: 160 },
    pattern: { value: createCampaignRegExp.validMessageDescription }
  },
  genre: {
    required: true,
    number: true,
    min: { value: 1 },
  },
  startDate: {
    required: true,
    date: {format: 'MM/DD/YYYY'}
  },
  endDate: {
    required: true,
    date: {format: 'MM/DD/YYYY'}
  },
  budget: {
    required: true,
  }
}

export { createCampaignValidator, createCampaignAvForm };
