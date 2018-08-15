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

const updateParameter = (parameterId, parameter) => {
  putData(`/parameters/update/${parameterId}`, parameter)
    .then((parameters) => {
      Flux.dispatchEvent('updateParameter', parameters);
    })
    .catch((err) => {
      Flux.dispatchEvent('ParametersStoreError', err);
    });
}

const resetParameter = (parameterId, parameterName) => {
  putData(`/parameters/reset/${parameterId}`, { parameterName: parameterName })
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
