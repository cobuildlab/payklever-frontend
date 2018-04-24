import Flux from '@4geeksacademy/react-flux-dash';

const logout = () => {
  Flux.dispatchEvent('setUser', undefined);
}

export { logout };
