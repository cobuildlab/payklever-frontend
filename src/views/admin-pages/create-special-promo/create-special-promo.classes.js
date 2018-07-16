export class CreateSpecialPromoForm {
  constructor(name, description, startDate, endDate, amount, userId) {
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.amount = amount;
    this.userId = userId;
  }
}
