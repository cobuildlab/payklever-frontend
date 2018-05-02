const validCampaignName = /^(?!.*?\s{2})[A-Za-z ]{6,40}$/;
const validMessageTitle = /^(?!.*?\s{2})[A-Za-z ]{6,40}$/;
const validMessageDescription = /^(?!.*?\s{2})[A-Za-z ]{40,160}$/;

export { validCampaignName, validMessageTitle, validMessageDescription };
