export class CreatePaymentForm {
  constructor(firstName, lastName, cardNumber, expireMonth, expireYear, securityCode, zipCode) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.cardNumber = cardNumber;
    this.expireMonth = expireMonth;
    this.expireYear = expireYear;
    this.securityCode = securityCode;
    this.zipCode = zipCode;
  }
}
