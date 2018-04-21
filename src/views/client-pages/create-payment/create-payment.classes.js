export class CreatePaymentForm {
  constructor(firstName, lastName, cardNumber, expirationDateMonth, expirationDateYear, securityCode, country, postalCode) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.cardNumber = cardNumber;
    this.expirationDateMonth = expirationDateMonth;
    this.expirationDateYear = expirationDateYear;
    this.securityCode = securityCode;
    this.country = country;
    this.postalCode = postalCode;
  }
}
