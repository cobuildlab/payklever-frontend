export class CreateCouponPromoForm {
  constructor(name, description, startDate, endDate, amount, type, userId) {
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.amount = amount;
    this.type = type;
    this.userId = userId;
  }
}
