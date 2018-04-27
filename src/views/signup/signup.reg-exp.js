const validFirstName = /^(?!.*?\s{2})[A-Za-z ]{3,40}$/;
const validLastName = /^(?!.*?\s{2})[A-Za-z ]{3,40}$/;
const validPassword = /^[^\s]{8,20}$/;
const validEmail =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export { validFirstName, validLastName, validEmail, validPassword };
