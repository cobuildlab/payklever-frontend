import Flux from '@4geeksacademy/react-flux-dash';

const logout = () => {
  Flux.dispatchEvent('setUser', undefined);
}

const changeAccount = (account) => {
  Flux.dispatchEvent('changeAccount', account);
}

export { logout, changeAccount };
