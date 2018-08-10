import Flux from '@4geeksacademy/react-flux-dash';
import { getData, putData } from '../../../fetch';

const getParametersDetails = () => {
  getData(`/parameters/detail`)
    .then((parameters) => {
      Flux.dispatchEvent('getParametersDetails', parameters);
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
  getParametersDetails,
  updateParameter,
  resetParameter,
};
