export class CreateAccountForm {
  constructor(name, paymediaId, location, city, state, country, level2, zipCode, latitude, longitude) {
    this.name = name;
    this.paymediaId = paymediaId;
    this.location = location;
    this.city = city;
    this.state = state;
    this.country = country;
    this.level2 = level2;
    this.zipCode = zipCode;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
