export class CreateCampaignForm {
  constructor(name, messageTitle, messageDescription, genreId, ages, budget, startDate, endDate, timeFrames, accountId) {
    this.name = name;
    this.messageTitle = messageTitle;
    this.messageDescription = messageDescription;
    this.genreId = genreId;
    this.ages = ages;
    this.budget = budget;
    this.startDate = startDate;
    this.endDate = endDate;
    this.timeFrames = timeFrames;
    this.accountId = accountId;
    // this.estimatedIncomes = estimatedIncomes;
  }
}
