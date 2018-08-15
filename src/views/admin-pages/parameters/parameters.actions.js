import Flux from '@4geeksacademy/react-flux-dash';
import { getData, putData } from '../../../fetch';

const getParameters = () => {
  getData(`/parameters/`)
    .then((parameters) => {
      Flux.dispatchEvent('getParameters', parameters);
    })
    .catch((err) => {
      Flux.dispatchEvent('ParametersStoreError', err);
    });
}

const updateParameter = (parameterId, parameterValue) => {
  putData(`/parameters/update/${parameterId}`, { value: parameterValue })
    .then((parameters) => {
      Flux.dispatchEvent('updateParameter', parameters);
    })
    .catch((err) => {
      Flux.dispatchEvent('ParametersStoreError', err);
    });
}

const resetParameter = (parameterId) => {
  putData(`/parameters/reset/${parameterId}`)
    .then((parameters) => {
      Flux.dispatchEvent('resetParameter', parameters);
    })
    .catch((err) => {
      Flux.dispatchEvent('ParametersStoreError', err);
    });
}

export {
  getParameters,
  updateParameter,
  resetParameter,
};
