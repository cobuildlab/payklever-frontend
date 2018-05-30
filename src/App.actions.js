import Flux from '@4geeksacademy/react-flux-dash';

const setCachedUser = (user) => {
  Flux.dispatchEvent('setUser', user);
}

const deleteAccounts = () => {
  Flux.dispatchEvent('getAccounts', []);
  Flux.dispatchEvent('changeAccount', {});
}

export { setCachedUser, deleteAccounts };
