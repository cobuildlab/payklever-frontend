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
  FormGroup,
  Input,
  Alert,
} from 'reactstrap';
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
} from 'availity-reactstrap-validation';
import { Link } from "react-router-dom";
var autocomplete;
const google = window.google;

class CreateAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      name: '',
      paymediaId: '',
      location: '',
      city: '',
      state: '',
      country: '',
      level2: '',
      zipCode: '',
      latitude: null,
      longitude: null,
      paymentMethods: [],
    };

    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.initAutocomplete();

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

      <SubNav backRoute="/client/profile/accounts" titleI18n="CREATE_ACCOUNT.createAccount"></SubNav>

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
            <FormGroup>
              <Label for="autocomplete">{ t('CREATE_ACCOUNT.location') }</Label>
              <Input onKeyPress={this.handleKeyPress} type="text" id="autocomplete" placeholder={ t('CREATE_ACCOUNT.location') }/>
            </FormGroup>
            <AvGroup>
              <Label for="city">{ t('CREATE_ACCOUNT.city') }</Label>
              <AvInput disabled value={this.state.city} type="text" name="city" id="autocomplete" placeholder={ t('CREATE_ACCOUNT.city') } required/>
              <AvFeedback>{ t('CREATE_ACCOUNT.emptyCity') }</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="state">{ t('CREATE_ACCOUNT.state') }</Label>
              <AvInput disabled value={this.state.state} type="text" name="state" id="autocomplete" placeholder={ t('CREATE_ACCOUNT.state') } required/>
              <AvFeedback>{ t('CREATE_ACCOUNT.emptyState') }</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="country">{ t('CREATE_ACCOUNT.country') }</Label>
              <AvInput disabled value={this.state.country} type="text" name="country" id="autocomplete" placeholder={ t('CREATE_ACCOUNT.country') } required/>
              <AvFeedback>{ t('CREATE_ACCOUNT.emptyCountry') }</AvFeedback>
            </AvGroup>
            <AvGroup>
              <Label for="zipCode">{ t('CREATE_ACCOUNT.zipCode') }</Label>
              <AvInput disabled value={this.state.zipCode} type="text" name="zipCode" id="autocomplete" placeholder={ t('CREATE_ACCOUNT.zipCode') } required/>
              <AvFeedback>{ t('CREATE_ACCOUNT.emptyZipCode') }</AvFeedback>
            </AvGroup>

              <div className="text-center mb-4">
                <Link to="/client/profile/accounts">
                  <Button className="mr-3 mt-4" color="danger" type="button">
                  { t('CREATE_ACCOUNT.cancel') }
                  </Button>
                </Link>
                <Button type="submit" className=" mt-4" color="primary">
                { t('ACCOUNTS.createAccount') }
                </Button>
              </div>

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
      parseInt(this.state.paymediaId, 10) || null,
      this.state.location,
      this.state.city,
      this.state.state,
      this.state.country,
      this.state.level2,
      this.state.zipCode,
      this.state.latitude,
      this.state.longitude,
    );

    createAccountActions.createAccount(createAccountForm);
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') event.preventDefault();
  }

  initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */
      (document.getElementById('autocomplete')), {types: ['address']});

    autocomplete.addListener('place_changed', this.fillInAddress);
  }

  fillInAddress = () => {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    const componentForm = {
      locality: 'long_name',
      administrative_area_level_1: 'long_name',
      administrative_area_level_2: 'long_name',
      country: 'long_name',
      postal_code: 'short_name'
    };

    console.log(place);

    const componentData = {};

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];
      if (componentForm[addressType]) {
        componentData[addressType] = place
          .address_components[i][componentForm[addressType]];
      }
    }

    this.setState({
      location: place.formatted_address || '',
      city: componentData.locality || '',
      state: componentData.administrative_area_level_1 || '',
      country: componentData.country || '',
      level2: componentData.administrative_area_level_2 || '',
      zipCode: componentData.postal_code || '',
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng(),
    });
  }

  isLoading(isLoading) {
    this.setState({ loading: isLoading });
  }
}

export default CreateAccount;
