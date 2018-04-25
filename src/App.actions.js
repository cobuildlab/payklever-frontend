import Flux from '@4geeksacademy/react-flux-dash';

const setCachedUser = (user) => {
  Flux.dispatchEvent('setUser', user);
}

export { setCachedUser };
