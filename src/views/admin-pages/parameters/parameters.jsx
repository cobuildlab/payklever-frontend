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
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Loading, ModalConfirm, SubNav } from '../../components';

class Parameters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      loadingI18n: '',
      parameters: [],
      resetParameterName: '',
      updateParameterIsOpen: false,
      resetParameterIsOpen: false,
    }
  };

  componentDidMount() {
    this.getParametersSubscription = parametersStore
      .subscribe('getParameters', (parameters) => {
        this.setState({ parameters });
        this.isLoading(false);
      });

    this.updateParameterSubscription = parametersStore
      .subscribe('updateParameter', (parameters) => {
        this.isLoading(false);
      });

    this.resetParameterSubscription = parametersStore
      .subscribe('resetParameter', (parameters) => {
        this.isLoading(false);
      });

    this.parametersStoreError = parametersStore
      .subscribe('ParametersStoreError', (err) => {
        this.isLoading(false);
        toast.dismiss();
        toast.error(err.message || i18next.t('FETCH.error'));
      });

    this.getParameters();
  }

  componentWillUnmount() {
    this.getParametersSubscription.unsubscribe();
    this.updateParameterSubscription.unsubscribe();
    this.resetParameterSubscription.unsubscribe();
    this.parametersStoreError.unsubscribe();
  }

  render() {
    return (<I18n>{(t, { i18n }) => (<div>
      <SubNav backRoute="/admin/campaign-manager/client-campaigns" subNavTitle={t('PARAMETERS.editParameters')}></SubNav>

      <Loading isLoading={this.state.loading} loadingMessage={ t(this.state.loadingI18n) }></Loading>

      <ModalConfirm isOpen={this.state.updateParameterIsOpen} modalHeader={t('PARAMETERS.updateHeader')} modalBody={t('PARAMETERS.updateBody', { parameterName: this.state.updateParameterName || ' ' } )}
      acceptI18n="PARAMETERS.updateParameter" confirm={this.updateParameter} />

      <ModalConfirm isOpen={this.state.resetParameterIsOpen} modalHeader={t('PARAMETERS.resetHeader')} modalBody={t('PARAMETERS.resetBody', { parameterName: this.state.resetParameterName || ' ' } )}
      acceptI18n="PARAMETERS.resetParameter" confirm={this.resetParameter} />

      <Container className="p-0">
        <Table hover className="mt-5">
        <tbody>
          <TransitionGroup component={null}>
           { (Array.isArray(this.state.parameters)) ?
             this.state.parameters.map((parameter, index) =>
             <CSSTransition key={index} timeout={500} classNames="fade-in-change">
               <tr>
                 <td>
                    {(this.state.updateParameterName === parameter.name) ?
                    <AvForm autoComplete="off" noValidate>
                     <AvGroup>
                       <AvInput autoComplete="off" disabled={this.state.updateParameterName !== parameter.name} autoFocus type="text" name={parameter.name} placeholder={ t(`${parameter.name}`) } onChange={(evt) => this.setState({[parameter.name]: evt.target.value})} required/>
                       <AvFeedback>
                         { t(`PARAMETERS.required`) }
                       </AvFeedback>
                     </AvGroup>
                   </AvForm>
                   : parameter.name}
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
                    <Button onClick={() => this.updateParameter(false, parameter)} color="success" size="sm" type="submit">
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
    this.setState({
      [parameterName]: '',
      updateParameterName: parameterName,
    });
  }

  /**
   * toggles the updateParameter modal and update the selected parameter if you pass confirm = true
   * @param  {Boolean} [confirm=false] pass true from the ModalConfirm
   * component only to approve the campaign
   * @param  {String}  [updateParameterName] to set the last selected parameter's name,
   * pass the parameter name from the parameters list
   */
  updateParameter = (confirm = false, parameter) => {
    if (parameter) {
      if (!this.state[parameter.name]) return;

      this.setState({
        formatedParameter: {
          [parameter.name]: this.state[parameter.name],
        },
      });
    }

    this.setState({ updateParameterIsOpen: !this.state.updateParameterIsOpen });

    if (confirm === true) {
      this.isLoading(true, 'PARAMETERS.updatingParameter');
      parametersActions.updateParameter(this.state.parameters._id, this.state.formatedParameter);
    }
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

  getParameters = () => {
    this.isLoading(true, 'PARAMETERS.loadingParameters');
    parametersActions.getParameters();
  }

  isLoading = (isLoading, loadingI18n = this.state.loadingI18n) => {
    this.setState({
      loadingI18n,
      loading: isLoading
    });
  }
}

export default Parameters;
