const validFirstName = /^[^0-9]{3,40}$/;
const validLastName = /^[^0-9]{3,40}$/;
const validExpireMonth = /^0[1-9]|1[0-2]$/;
const validExpireYear = /^[0-9]{2,2}$/;
const validSecurityCode = /^[0-9]{3,4}$/;
const validCardNumber = /^[0-9]{13,16}$/;
const validZipCode = /^.{4,12}$/;

export { validFirstName, validLastName, validExpireMonth, validExpireYear, validZipCode, validSecurityCode, validCardNumber };
