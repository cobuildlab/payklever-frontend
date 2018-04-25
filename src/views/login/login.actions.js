import Flux from '@4geeksacademy/react-flux-dash';
import {
  postData
} from '../../fetch';

const login = (loginForm) => {
  return postData('/auth/login', loginForm, false)
    .then((res) => {
      Flux.dispatchEvent('setUser', res);
      return Promise.resolve(res);
    });
}

export { login };
