import Flux from '@4geeksacademy/react-flux-dash';

class ParametersStore extends Flux.DashStore {
  constructor() {
    super();

    /**
     * Notifies when the parameters list was loaded
     * @param {Array}  parameters the parameters list
     */
    this.addEvent('getParameters');


    /**
     * Notifies when a parameter was updated
     * @param {object}  parameters the parameters
     */
    this.addEvent('updateParameter');

    /**
     * Notifies when a parameter was reseted
     * @param {object}  parameters the parameters
     */
    this.addEvent('resetParameter');

    /**
     * Error handler
     * @param {Error} err the error from the action
     */
    this.addEvent('ParametersStoreError');
  }
}

const parametersStore = new ParametersStore();

export default parametersStore;
