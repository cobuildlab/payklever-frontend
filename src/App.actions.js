import Flux from '@4geeksacademy/react-flux-dash';

const setCachedUser = (user) => {
  console.log('setCachedUser', user);
  Flux.dispatchEvent('setUser', user);
}

export { setCachedUser };
