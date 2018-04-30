import React, { Component } from 'react';
import { SubNav } from '../../components';
import { CreateAccountForm } from './create-account.classes';
import * as createAccountActions from './create-account.actions';
import * as PaymentMethodsActions from '../payment-methods/payment-methods.actions';
import { i18next } from '../../../i18n';
import { toast } from 'react-toastify';
import { accountStore, paymentStore } from '../../../stores';
import { createAccountAvForm } from './create-account.validators';
import { CSSTransition } from 'react-transition-group';
import { RingLoader } from 'react-spinners';
import {
  I18n
} from 'react-i18next';
import {
  Container,
  Col,
  Row,
  Button,
  Label,
} from 'reactstrap';
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
} from 'availity-reactstrap-validation';

class CreateAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      name: '',
      location: '',
      paymediaId: '',
      paymentMethods: [],
    };

    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.createAccountSubscription = accountStore
      .subscribe('createAccount', (account) => {
        this.isLoading(false);
        toast.dismiss();
        toast.success(i18next.t('CREATE_ACCOUNT.accountCreated'));
        this.props.history.push('/client/profile/accounts');
      });

    this.accountStoreError = accountStore
      .subscribe('AccountStoreError', (err) => {
        this.isLoading(false);
        toast.dismiss();
        toast.error(err.message || i18next.t('FETCH.error'));
      });

    this.getPaymentsSubscription = paymentStore
      .subscribe('getPayments', (paymentMethods) => {
        this.setState({ paymentMethods });
      });

    this.paymentStoreError = paymentStore
      .subscribe('PaymentStoreError', (err) => {
        toast.dismiss();
        toast.error(err.message || i18next.t('FETCH.error'));
      });

    PaymentMethodsActions.getPaymentMethods();
  }

  componentWillUnmount() {
    this.createAccountSubscription.unsubscribe();
    this.accountStoreError.unsubscribe();
    this.getPaymentsSubscription.unsubscribe();
    this.paymentStoreError.unsubscribe();
  }

  render() {
    return (<I18n>{(t, { i18n }) => (<div>

      <CSSTransition in={this.state.loading} timeout={500} classNames="fade-in" unmountOnExit>
        <div className="App-overlay">
          <div style={{width: '200px'}} className="App-center-loading">
            <h4 className="text-center">
              { t('CREATE_ACCOUNT.creatingAccount') }
            </h4>
            <RingLoader size={200} color={'#75c044'} loading={true}/>
          </div>
        </div>
      </CSSTransition>

      <SubNav titleI18n="CREATE_ACCOUNT.createAccount"></SubNav>

        <Container className="mt-4">
          <Row>
            <Col md={{
                size: 6,
                offset: 3
              }}>
          <AvForm onValidSubmit={(evt) => this.createAccount(evt)} noValidate>
            <AvGroup>
              <Label for="name">{ t('CREATE_ACCOUNT.accountName') }</Label>
              <AvInput type="text" name="name" id="name" placeholder={ t('CREATE_ACCOUNT.accountName') } value={this.state.name} onChange={(evt) => this.setState({name: evt.target.value})} validate={createAccountAvForm.name}/>
              <AvFeedback>{ t('CREATE_ACCOUNT.invalidName') }</AvFeedback>
            </AvGroup>
            {/* <AvGroup>
              <Label for="location">{ t('CREATE_ACCOUNT.location') }</Label>
              <AvInput type="text" name="location" id="location" placeholder={ t('CREATE_ACCOUNT.location') } value={this.state.location} onChange={(evt) => this.setState({location: evt.target.value})} pattern="^[a-zA-Z]*$" required/>
              <AvFeedback>{ t('CREATE_ACCOUNT.InvalidLocation') }</AvFeedback>
            </AvGroup> */}
            <AvGroup>
              <Label for="paymediaId">
                { t('CREATE_ACCOUNT.paymentMethod') }
              </Label>
              <AvInput onChange={(evt) => this.setState({paymediaId: evt.target.value})} value={this.state.paymediaId} type="select" name="paymediaId" label={ t('CREATE_ACCOUNT.paymentMethod') } validate={createAccountAvForm.paymediaId}>
                {!this.state.paymediaId && <option value="" disabled>
                  { t('CREATE_ACCOUNT.selectPaymentMethod') }
                </option>}
                {this.state.paymentMethods.map((paymentMethod) =>
                  <option key={paymentMethod.id} value={paymentMethod.id}>{paymentMethod.cardNumber}</option>
                )}
              </AvInput>
              <AvFeedback>
                { t('CREATE_ACCOUNT.selectPaymentMethod') }
              </AvFeedback>
            </AvGroup>
            <AvGroup>
              <Button  type="submit" className="d-block mx-auto mt-4" color="primary">
              { t('ACCOUNTS.addAccount') }
              </Button>
            </AvGroup>
          </AvForm>
          </Col>
        </Row>
      </Container>
    </div>)}</I18n>);
  }

  createAccount(evt) {
    this.isLoading(true);

    const createAccountForm = new CreateAccountForm(
      this.state.name,
      this.state.paymediaId,
    );

    createAccountActions.createAccount(createAccountForm);
  }

  isLoading(isLoading) {
    this.setState({ loading: isLoading });
  }
}

export default CreateAccount;
