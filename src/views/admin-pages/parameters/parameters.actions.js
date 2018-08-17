import Flux from '@4geeksacademy/react-flux-dash';
import { getData, putData } from '../../../fetch';

const getParameters = () => {
  getData(`/settings/`)
    .then((parameters) => {
      Flux.dispatchEvent('getParameters', parameters);
    })
    .catch((err) => {
      Flux.dispatchEvent('ParametersStoreError', err);
    });
}

const updateParameter = (parameterId, parameterValue) => {
  putData(`/settings/${parameterId}`, { value: parameterValue })
    .then((parameters) => {
      Flux.dispatchEvent('updateParameter', parameters);
    })
    .catch((err) => {
      Flux.dispatchEvent('ParametersStoreError', err);
    });
}

const resetParameter = (parameterId, parameterName) => {
  putData(`/settings/${parameterId}/reset`, { name: parameterName})
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
