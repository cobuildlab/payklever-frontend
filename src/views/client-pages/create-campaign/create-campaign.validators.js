import * as utils from '../../../utils';
import { i18next } from '../../../i18n';
import moment from 'moment';
import { CreateCampaignForm } from './create-campaign.classes';
import * as createCampaignRegExp from './create-campaign.reg-exp';

const createCampaignValidator = (createCampaignForm: CreateCampaignForm) => {
  if (!(createCampaignForm instanceof CreateCampaignForm)) {
    throw new Error(i18next.t('APP.invalidForm'))
  }

  /*
  Validate empty fields
   */
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

  if (createCampaignForm.accountId === undefined ||
    createCampaignForm.accountId === null) {
    throw new Error(i18next.t('CREATE_CAMPAIGN.emptyAccount'));
  }

  if (createCampaignForm.genreId === undefined ||
    createCampaignForm.genreId === null) {
    throw new Error(i18next.t('CREATE_CAMPAIGN.emptyGender'));
  }

  if (createCampaignForm.budget === null ||
     createCampaignForm.budget === undefined) {
    throw new Error(i18next.t('CREATE_CAMPAIGN.emptyBudget'));
  }

  if (createCampaignForm.startDate === undefined) {
    throw new Error(i18next.t('CREATE_CAMPAIGN.emptyStartDate'));
  }

  if (createCampaignForm.endDate === undefined) {
    throw new Error(i18next.t('CREATE_CAMPAIGN.emptyEndDate'));
  }

  /*
   validate regExp (strings)
   */
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

  /*
  validate genreId and accountId (isValidNumber)
   */
  if (!utils.isValidNumber(createCampaignForm.genreId.toString())) {
    throw new Error(i18next.t('CREATE_CAMPAIGN.invalidGender'));
  }

  if (!utils.isValidNumber(createCampaignForm.accountId.toString())) {
    throw new Error(i18next.t('CREATE_CAMPAIGN.invalidAccount'));
  }

  /*
  validate list of ids (invalid or empty)
   */
  if (createCampaignForm.ages !== undefined) {
    let agesAsJson;
    try {
      agesAsJson = JSON.parse(createCampaignForm.ages);
    } catch (err) {
      throw new Error(i18next.t('CREATE_CAMPAIGN.invalidAge'));
    }

    if (Array.isArray(agesAsJson) === false) {
      throw new Error(i18next.t('CREATE_CAMPAIGN.invalidAge'));
    } else if (agesAsJson.length === 0) {
      throw new Error(i18next.t('CREATE_CAMPAIGN.emptyAge'));
    } else if (!agesAsJson.every((element) => {
        return (Number.isInteger(element) && element > 0)
      })) {
      throw new Error(i18next.t('CREATE_CAMPAIGN.invalidAge'));
    }
  } else throw new Error(i18next.t('CREATE_CAMPAIGN.emptyAge'));

  if (createCampaignForm.estimatedIncomes !== undefined) {
    let estimatedIncomesAsJson;
    try {
      estimatedIncomesAsJson = JSON.parse(createCampaignForm.estimatedIncomes);
    } catch (err) {
      throw new Error(i18next.t('CREATE_CAMPAIGN.invalidIncome'));
    }

    if (Array.isArray(estimatedIncomesAsJson) === false) {
      throw new Error(i18next.t('CREATE_CAMPAIGN.invalidIncome'));
    } else if (estimatedIncomesAsJson.length === 0) {
      throw new Error(i18next.t('CREATE_CAMPAIGN.emptyIncome'));
    } else if (!estimatedIncomesAsJson.every((element) => {
        return (Number.isInteger(element) && element > 0)
      })) {
      throw new Error(i18next.t('CREATE_CAMPAIGN.invalidIncome'));
    }
  } else throw new Error(i18next.t('CREATE_CAMPAIGN.emptyIncome'));

  if (createCampaignForm.timeFrames !== undefined) {
    let timeFramesAsJson;
    try {
      timeFramesAsJson = JSON.parse(createCampaignForm.timeFrames);
    } catch (err) {
      throw new Error(i18next.t('CREATE_CAMPAIGN.invalidHourHand'));
    }

    if (Array.isArray(timeFramesAsJson) === false) {
      throw new Error(i18next.t('CREATE_CAMPAIGN.invalidHourHand'));
    } else if (timeFramesAsJson.length === 0) {
      throw new Error(i18next.t('CREATE_CAMPAIGN.emptyHourHand'));
    } else if (!timeFramesAsJson.every((element) => {
        return (Number.isInteger(element) && element > 0)
      })) {
      throw new Error(i18next.t('CREATE_CAMPAIGN.invalidHourHand'));
    }
  } else throw new Error(i18next.t('CREATE_CAMPAIGN.emptyHourHand'));

  /*
   validate budget (valid number)
   */
  if (typeof(createCampaignForm.budget) !== 'number') {
    throw new Error(i18next.t('CREATE_CAMPAIGN.invalidBudget'));
  }

  /*
  validate dates (moment)
   */
  if (!moment(createCampaignForm.startDate).isValid()) {
    throw new Error(i18next.t('CREATE_CAMPAIGN.invalidStartDate'));
  }

  if (!moment(createCampaignForm.endDate).isValid()) {
    throw new Error(i18next.t('CREATE_CAMPAIGN.invalidEndDate'));
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
  },
  endDate: {
    required: true,
  },
  budget: {
    min: { value: 1 },
    required: true,
  }
}

export { createCampaignValidator, createCampaignAvForm };
