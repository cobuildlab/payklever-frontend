export class CreateCampaignForm {
  constructor(name, link, messageDescription, genreId, ages, budget, startDate, endDate, timeFrames, accountId) {
    this.name = name;
    this.link = link;
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
