import React, { Component } from 'react';
import { i18next } from '../../../i18n';
import { toast } from 'react-toastify';
import { parametersStore } from '../../../stores';
import * as parametersActions from './parameters.actions';
import {
  I18n
} from 'react-i18next';
import {
  Container,
  Table,
  Button,
} from 'reactstrap';
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
} from 'availity-reactstrap-validation';
import { parametersAvForm } from './parameters.validators';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Loading, ModalConfirm } from '../../components';

class Parameters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      loadingI18n: '',
      parameters: {},
      FRONT_URL: '',
      BACK_URL: '',
      SHORTENER_URL: '',
      TZ: '',
      TWILIO_NUMBER: '',
      TWILIO_ACCOUNT_SID: '',
      TWILIO_AUTH_TOKEN: '',
      STRIPE_PUBLIC_KEY: '',
      STRIPE_SECRET_KEY: '',
      FIXED_VALUE_PER_MSG: null,
      TAX: null,
      CONFIRMATION_SUCCESS_URL: '',
      CONFIRMATION_ERROR_URL: '',
      FIXED_GEOPOSITION_RADIUS_IN_MILES: null,
      PAGINATION_LIMIT: null,
      SEARCH_LIMIT: null,
      updateParameterName: '',
      resetParameterName: '',
      resetParameterIsOpen: false,
    }
  };

  componentDidMount() {
    this.getParametersDetailsSubscription = parametersStore
      .subscribe('getParametersDetails', (parameters) => {
        this.setState({ parameters, updateParameterName: '' });
        this.isLoading(false);
      });

    this.updateParameterSubscription = parametersStore
      .subscribe('updateParameter', (parameters) => {
        this.resetParametersState();
        this.getParametersDetails();
      });

    this.resetParameterSubscription = parametersStore
      .subscribe('resetParameter', (parameters) => {
        this.resetParametersState();
        this.getParametersDetails();
      });

    this.parametersStoreError = parametersStore
      .subscribe('ParametersStoreError', (err) => {
        this.isLoading(false);
        toast.dismiss();
        toast.error(err.message || i18next.t('FETCH.error'));
      });

    this.getParametersDetails();
  }

  componentWillUnmount() {
    this.getParametersDetailsSubscription.unsubscribe();
    this.updateParameterSubscription.unsubscribe();
    this.resetParameterSubscription.unsubscribe();
    this.parametersStoreError.unsubscribe();
  }

  render() {
    /*
    inputs names and types
     */
    const parametersInputs = [{
        name: 'FRONT_URL',
        type: 'text'
      },
      {
        name: 'BACK_URL',
        type: 'text',
      },
      {
        name: 'SHORTENER_URL',
        type: 'text'
      },
      {
        name: 'TZ',
        type: 'text',
      },
      {
        name: 'TWILIO_NUMBER',
        type: 'text'
      },
      {
        name: 'TWILIO_ACCOUNT_SID',
        type: 'text'
      },
      {
        name: 'TWILIO_AUTH_TOKEN',
        type: 'text'
      },
      {
        name: 'STRIPE_PUBLIC_KEY',
        type: 'text'
      },
      {
        name: 'STRIPE_SECRET_KEY',
        type: 'text',
      },
      {
        name: 'FIXED_VALUE_PER_MSG',
        type: 'number',
      },
      {
        name: 'TAX',
        type: 'number',
      },
      {
        name: 'CONFIRMATION_SUCCESS_URL',
        type: 'text',
      },
      {
        name: 'CONFIRMATION_ERROR_URL',
        type: 'text',
      },
      {
        name: 'FIXED_GEOPOSITION_RADIUS_IN_MILES',
        type: 'number',
      },
      {
        name: 'PAGINATION_LIMIT',
        type: 'number',
      },
      {
        name: 'SEARCH_LIMIT',
        type: 'number',
      }
    ];

    return (<I18n>{(t, { i18n }) => (<div>

      <Loading isLoading={this.state.loading} loadingMessage={ t(this.state.loadingI18n) }></Loading>

      <ModalConfirm isOpen={this.state.resetParameterIsOpen} modalHeader={t('PARAMETERS.resetHeader')} modalBody={t('PARAMETERS.resetBody', { parameterName: this.state.resetParameterName || ' ' } )}
      acceptI18n="PARAMETERS.resetParameter" confirm={this.resetParameter} />

      <Container className="p-0">
        <Table hover className="mt-5">
          <thead>
            <tr>
              <th className="App-header-table-admin">
                { t('PARAMETERS.name') }
              </th>
              <th className="App-header-table-admin">
                { t('PARAMETERS.value') }
              </th>
              <th className="App-header-table-admin"></th>
              <th className="App-header-table-admin"></th>
            </tr>
          </thead>
        <tbody>
          <TransitionGroup component={null}>
           { (parametersInputs) ? parametersInputs.map((parameter, index) =>
             <CSSTransition key={index} timeout={500} classNames="fade-in-change">
               <tr>
                 <td>{parameter.name}</td>
                 <td>
                   {(this.state.updateParameterName === parameter.name) ?
                     <AvForm noValidate>
                     <AvGroup>
                       <AvInput autoFocus type={parameter.type} name={parameter.name} placeholder={ t(`${parameter.name}`) } onChange={(evt) => this.setState({[parameter.name]: evt.target.value})} validate={parametersAvForm[parameter.name]}/>
                       <AvFeedback>
                         { t(`PARAMETERS.required`) }
                       </AvFeedback>
                     </AvGroup>
                    </AvForm>
                    : this.state.parameters[parameter.name]}
                 </td>
                 <td>
                   {(this.state.updateParameterName === parameter.name) ?
                   <Button onClick={() => this.setUpdateName('')} color="danger" size="sm" type="button">
                     { t('PARAMETERS.cancel') }
                   </Button>
                   : <Button onClick={() => this.resetParameter(false, parameter.name)} color="success" size="sm" type="button">
                     { t('PARAMETERS.reset') }
                   </Button>}
                 </td>
                 <td>
                   {(this.state.updateParameterName === parameter.name) ?
                    <Button onClick={() => this.updateParameter(parameter)} color="success" size="sm" type="submit">
                      { t('PARAMETERS.update') }
                    </Button>
                   : <Button onClick={() => this.setUpdateName(parameter.name)} color="secondary" size="sm" type="button">
                       { t('PARAMETERS.update') }
                    </Button> }
                 </td>
               </tr>
             </CSSTransition>)
           : null }
          </TransitionGroup>
        </tbody>
      </Table>

      </Container>
    </div>)}</I18n>);
  }

  setUpdateName = (parameterName) => {
    this.resetParametersState();

    this.setState({ updateParameterName: parameterName });
  }

  updateParameter = (parameter) => {
    if (!this.state[parameter.name]) return;

    const formatedParameter = {
      [parameter.name]: this.state[parameter.name],
    };

    this.isLoading(true, 'PARAMETERS.updatingParameter');
    parametersActions.updateParameter(this.state.parameters._id, formatedParameter);
  }

  /**
   * toggles the resetParameter modal and reset the selected parameter if you pass confirm = true
   * @param  {Boolean} [confirm=false] pass true from the ModalConfirm
   * component only to approve the campaign
   * @param  {String}  [resetParameterName] to set the last selected parameter's name,
   * pass the parameter name from the parameters list
   */
  resetParameter = (confirm = false, resetParameterName) => {
    if (resetParameterName) this.setState({ resetParameterName });

    this.setState({ resetParameterIsOpen: !this.state.resetParameterIsOpen });

    if (confirm === true) {
      this.isLoading(true, 'PARAMETERS.resetingParameter');
      parametersActions.resetParameter(this.state.parameters._id, this.state.resetParameterName);
    }
  }

  getParametersDetails = () => {
    this.isLoading(true, 'PARAMETERS.loadingParameters');
    parametersActions.getParametersDetails();
  }

  resetParametersState = () => {
    this.setState({
      FRONT_URL: '',
      BACK_URL: '',
      SHORTENER_URL: '',
      TZ: '',
      TWILIO_NUMBER: '',
      TWILIO_ACCOUNT_SID: '',
      TWILIO_AUTH_TOKEN: '',
      STRIPE_PUBLIC_KEY: '',
      STRIPE_SECRET_KEY: '',
      FIXED_VALUE_PER_MSG: null,
      TAX: null,
      CONFIRMATION_SUCCESS_URL: '',
      CONFIRMATION_ERROR_URL: '',
      FIXED_GEOPOSITION_RADIUS_IN_MILES: null,
      PAGINATION_LIMIT: null,
      SEARCH_LIMIT: null,
    });
  }

  isLoading = (isLoading, loadingI18n = this.state.loadingI18n) => {
    this.setState({
      loadingI18n,
      loading: isLoading
    });
  }
}

export default Parameters;
