import * as utils from '../../utils'

const loginValidator = (email, password) => {
  if (!utils.isValidString(email)) throw new Error('LOGIN.emptyEmail');

  if (!utils.isValidString(password)) throw new Error('LOGIN.emptyPassword');
}

export { loginValidator };
