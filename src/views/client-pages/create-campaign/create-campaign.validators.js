import * as utils from '../../../utils';
import { i18next } from '../../../i18n';
import moment from 'moment';
import { CreateCampaignForm } from './create-campaign.classes';
import * as createCampaignRegExp from './create-campaign.reg-exp';

const draftCampaignValidator = (createCampaignForm: CreateCampaignForm,
  campaignId) => {
  if (!(createCampaignForm instanceof CreateCampaignForm)) {
    throw new Error(i18next.t('APP.invalidForm'))
  }

  /*
  validate campaignId
   */
   if (campaignId !== undefined) {
     if (!utils.isValidInteger(campaignId)) {
       throw new Error(i18next.t('CREATE_CAMPAIGN.invalidCampaignId'));
     }
   }

  /*
  Validate empty fields
   */
  if (!utils.isValidString(createCampaignForm.name)) {
    throw new Error(i18next.t('CREATE_CAMPAIGN.emptyName'));
  }

  /*
   validate regExp (strings)
   */
  if (!createCampaignRegExp.validCampaignName.test(createCampaignForm.name)) {
    throw new Error(`${i18next.t('CREATE_CAMPAIGN.name')}: ${i18next.t('CREATE_CAMPAIGN.invalidName')}`);
  }

  // if (createCampaignForm.link !== null &&
  //   createCampaignForm.link !== undefined) {
  //   if (!createCampaignRegExp.validLink
  //     .test(createCampaignForm.link)) {
  //     throw new Error(`${i18next.t('CREATE_CAMPAIGN.link')}: ${i18next.t('CREATE_CAMPAIGN.invalidLink')}`);
  //   }
  // }

  if (createCampaignForm.validMessageDescription !== null &&
    createCampaignForm.validMessageDescription !== undefined) {
    if (!createCampaignRegExp.validMessageDescription
      .test(createCampaignForm.messageDescription)) {
      throw new Error(`${i18next.t('CREATE_CAMPAIGN.messageDescription')}: ${i18next.t('CREATE_CAMPAIGN.invalidMessageDescription')}`);
    }
  }

  /*
  validate genreId and accountId (isValidInteger)
   */
  if (createCampaignForm.genreId !== null &&
    createCampaignForm.genreId !== undefined) {
    if (!utils.isValidInteger(createCampaignForm.genreId)) {
      throw new Error(i18next.t('CREATE_CAMPAIGN.invalidGender'));
    }
  }

  if (createCampaignForm.accountId !== null &&
    createCampaignForm.accountId !== undefined) {
    if (!utils.isValidInteger(createCampaignForm.accountId)) {
      throw new Error(i18next.t('CREATE_CAMPAIGN.invalidAccount'));
    }
  }

  /*
  validate list of ids (invalid or empty)
   */
  if (createCampaignForm.ages !== undefined &&
    createCampaignForm.ages !== '[]') {
    let agesAsJson;
    try {
      agesAsJson = JSON.parse(createCampaignForm.ages);
    } catch (err) {
      throw new Error(i18next.t('CREATE_CAMPAIGN.invalidAge'));
    }
    if (Array.isArray(agesAsJson) === false) {
      throw new Error(i18next.t('CREATE_CAMPAIGN.invalidAge'));
    } else if (agesAsJson.length > 0) {
      if (!agesAsJson.every((element) => {
          return (Number.isInteger(element) && element > 0)
        })) {
        throw new Error(i18next.t('CREATE_CAMPAIGN.invalidAge'));
      }
    }
  }

  // if (createCampaignForm.estimatedIncomes !== undefined &&
  //   createCampaignForm.estimatedIncomes !== '[]') {
  //   let estimatedIncomesAsJson;
  //   try {
  //     estimatedIncomesAsJson = JSON.parse(createCampaignForm.estimatedIncomes);
  //   } catch (err) {
  //     throw new Error(i18next.t('CREATE_CAMPAIGN.invalidIncome'));
  //   }
  //
  //   if (Array.isArray(estimatedIncomesAsJson) === false) {
  //     throw new Error(i18next.t('CREATE_CAMPAIGN.invalidIncome'));
  //   } else if (estimatedIncomesAsJson.length > 0) {
  //     if (!estimatedIncomesAsJson.every((element) => {
  //         return (Number.isInteger(element) && element > 0)
  //       })) {
  //       throw new Error(i18next.t('CREATE_CAMPAIGN.invalidIncome'));
  //     }
  //   }
  // }

  if (createCampaignForm.timeFrames !== undefined &&
    createCampaignForm.timeFrames !== '[]') {
    let timeFramesAsJson;
    try {
      timeFramesAsJson = JSON.parse(createCampaignForm.timeFrames);
    } catch (err) {
      throw new Error(i18next.t('CREATE_CAMPAIGN.invalidHourHand'));
    }

    if (Array.isArray(timeFramesAsJson) === false) {
      throw new Error(i18next.t('CREATE_CAMPAIGN.invalidHourHand'));
    } else if (timeFramesAsJson.length > 0) {
      if (!timeFramesAsJson.every((element) => {
          return (Number.isInteger(element) && element > 0)
        })) {
        throw new Error(i18next.t('CREATE_CAMPAIGN.invalidHourHand'));
      }
    }
  }

  /*
   validate budget (valid number)
   */
  if (createCampaignForm.budget !== undefined &&
    createCampaignForm.budget !== null) {
    if (typeof(createCampaignForm.budget) !== 'number') {
      throw new Error(i18next.t('CREATE_CAMPAIGN.invalidBudget'));
    }
  }

  /*
  validate dates (moment)
   */
  if (createCampaignForm.startDate !== undefined &&
    createCampaignForm.startDate !== null) {
    if (!moment(createCampaignForm.startDate).isValid()) {
      throw new Error(i18next.t('CREATE_CAMPAIGN.invalidStartDate'));
    }
  }

  if (createCampaignForm.endDate !== undefined &&
    createCampaignForm.endDate !== null) {
    if (!moment(createCampaignForm.endDate).isValid()) {
      throw new Error(i18next.t('CREATE_CAMPAIGN.invalidEndDate'));
    }
  }
}

const activateCampaignValidator = (createCampaignForm: CreateCampaignForm, paymediaId, campaignId) => {
  if (!(createCampaignForm instanceof CreateCampaignForm)) {
    throw new Error(i18next.t('APP.invalidForm'))
  }

  if (!utils.isValidInteger(campaignId)) {
    throw new Error(i18next.t('CREATE_CAMPAIGN.invalidCampaignId'));
  }

  /*
  Validate empty fields
   */
  if (!utils.isValidString(createCampaignForm.name)) {
    throw new Error(i18next.t('CREATE_CAMPAIGN.emptyName'));
  }

  if (!utils.isValidString(createCampaignForm.messageDescription)) {
    throw new Error(i18next.t('CREATE_CAMPAIGN.emptyMessageDescription'));
  }

  if (!utils.isValidString(createCampaignForm.messageDescription)) {
    throw new Error(i18next.t('CREATE_CAMPAIGN.emptyMessageDescription'));
  }

  if (paymediaId === undefined || paymediaId === null) {
    throw new Error(i18next.t('CREATE_CAMPAIGN.emptyPaymedia'));
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

  // if (createCampaignForm.link !== null &&
  //   createCampaignForm.link !== undefined) {
  //   if (!createCampaignRegExp.validLink
  //     .test(createCampaignForm.link)) {
  //     throw new Error(`${i18next.t('CREATE_CAMPAIGN.link')}: ${i18next.t('CREATE_CAMPAIGN.invalidLink')}`);
  //   }
  // }

  if (!createCampaignRegExp.validMessageDescription
    .test(createCampaignForm.messageDescription)) {
    throw new Error(`${i18next.t('CREATE_CAMPAIGN.messageDescription')}: ${i18next.t('CREATE_CAMPAIGN.invalidMessageDescription')}`);
  }

  /*
  validate genreId and accountId (isValidNumber)
   */
  if (!utils.isValidInteger(createCampaignForm.genreId)) {
    throw new Error(i18next.t('CREATE_CAMPAIGN.invalidGender'));
  }

  if (!utils.isValidInteger(createCampaignForm.accountId)) {
    throw new Error(i18next.t('CREATE_CAMPAIGN.invalidAccount'));
  }

  if (!utils.isValidInteger(paymediaId)) {
    throw new Error(i18next.t('CREATE_CAMPAIGN.invalidPaymedia'));
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

  // if (createCampaignForm.estimatedIncomes !== undefined) {
  //   let estimatedIncomesAsJson;
  //   try {
  //     estimatedIncomesAsJson = JSON.parse(createCampaignForm.estimatedIncomes);
  //   } catch (err) {
  //     throw new Error(i18next.t('CREATE_CAMPAIGN.invalidIncome'));
  //   }
  //
  //   if (Array.isArray(estimatedIncomesAsJson) === false) {
  //     throw new Error(i18next.t('CREATE_CAMPAIGN.invalidIncome'));
  //   } else if (estimatedIncomesAsJson.length === 0) {
  //     throw new Error(i18next.t('CREATE_CAMPAIGN.emptyIncome'));
  //   } else if (!estimatedIncomesAsJson.every((element) => {
  //       return (Number.isInteger(element) && element > 0)
  //     })) {
  //     throw new Error(i18next.t('CREATE_CAMPAIGN.invalidIncome'));
  //   }
  // } else throw new Error(i18next.t('CREATE_CAMPAIGN.emptyIncome'));

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
  link: {
    // required: true,
  },
  messageDescription: {
    // required: true,
    minLength: { value: 40 },
    maxLength: { value: 160 },
    pattern: { value: createCampaignRegExp.validMessageDescription }
  },
  startDate: {
    // required: true,
  },
  endDate: {
    // required: true,
  },
  budget: {
    min: { value: 1 },
    // required: true,
  }
}

export { draftCampaignValidator, activateCampaignValidator, createCampaignAvForm };
