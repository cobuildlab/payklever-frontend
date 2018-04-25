import React, { Component } from 'react';
import { SubNav } from '../../components';
import { CreatePaymentForm } from './create-payment.classes';
import * as CreatePaymentActions from './create-payment.actions';
import { paymentStore } from '../../../stores';
import { i18next } from '../../../i18n';
import { toast } from 'react-toastify';
import {
  I18n
} from 'react-i18next';
import {
  Container,
  Col,
  Row,
  Label,
  Button,
} from 'reactstrap';
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
} from 'availity-reactstrap-validation';

class CreatePayment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      firstName: '',
      lastName: '',
      cardNumber: '',
      expireMonth: '',
      expireYear: '',
      securityCode: '',
      country: '',
      zipCode: '',
    }

    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.createPaymentSubscription = paymentStore
      .subscribe('createPayment', (payment) => {
        this.isLoading(false);
        toast.dismiss();
        toast.success(i18next.t('CREATE_PAYMENT.paymentCreated'));
        this.props.history.push('/client/profile/payment-methods');
      });

    this.paymentStoreError = paymentStore
      .subscribe('PaymentStoreError', (err) => {
        this.isLoading(false);
        toast.dismiss();
        toast.error(err.message || i18next.t('FETCH.error'));
      });
  }

  componentWillUnmount() {
    this.createPaymentSubscription.unsubscribe();
    this.paymentStoreError.unsubscribe();
  }

  render() {
    return (<I18n>{(t, { i18n }) => (<div>
      <SubNav titleI18n="CREATE_PAYMENT.addPayment"></SubNav>

        <Container className="mt-4">
          <AvForm onValidSubmit={(evt) => this.createPayment(evt)} noValidate>
            <Row>
              <Col md={6}>
                <AvGroup>
                  <Label for="firstName">{ t('CREATE_PAYMENT.firstName') }</Label>
                  <AvInput type="text" name="firstName" id="firstName" placeholder={ t('CREATE_PAYMENT.firstName') } value={this.state.firstName} onChange={(evt) => this.setState({firstName: evt.target.value})} minLength="3" maxLength="20" required/>
                  <AvFeedback>{ t('CREATE_PAYMENT.invalidFirstName') }</AvFeedback>
                </AvGroup>
              </Col>
              <Col md={6}>
                <AvGroup>
                  <Label for="lastName">{ t('CREATE_PAYMENT.lastName') }</Label>
                  <AvInput type="text" name="lastName" id="lastName" placeholder={ t('CREATE_PAYMENT.lastName') } value={this.state.lastName} onChange={(evt) => this.setState({lastName: evt.target.value})} minLength="3" maxLength="20" required/>
                  <AvFeedback>{ t('CREATE_PAYMENT.invalidLastName') }</AvFeedback>
                </AvGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <AvGroup>
                  <Label for="cardNumber">{ t('CREATE_PAYMENT.cardNumber') }</Label>
                  <AvInput type="text" name="cardNumber" id="cardNumber" placeholder={ t('CREATE_PAYMENT.cardNumber') } value={this.state.cardNumber} onChange={(evt) => this.setState({cardNumber: evt.target.value})}  minLength="16" maxLength="16" validate={{number: true}} required/>
                  <AvFeedback>{ t('CREATE_PAYMENT.invalidCardNumber') }</AvFeedback>
                </AvGroup>
              </Col>
              <Col md={6} lg={2}>
                <AvGroup>
                  <Label for="expireMonth">{ t('CREATE_PAYMENT.expirationDate') }</Label>
                  <AvInput type="text" name="expireMonth" id="expireMonth" placeholder={ t('CREATE_PAYMENT.expireMonth') } value={this.state.expireMonth} onChange={(evt) => this.setState({expireMonth: evt.target.value})}  minLength="2" maxLength="2" min="1" max="12" validate={{number: true}} required/>
                  <AvFeedback>{ t('CREATE_PAYMENT.invalidExpirationDateMonth') }</AvFeedback>
                </AvGroup>
              </Col>
              <Col md={6} lg={2}>
                <AvGroup>
                <Label style={{color: 'transparent'}} for="expireYear">{'_'}</Label>
                <AvInput type="text" name="expireYear" id="expireYear" placeholder={ t('CREATE_PAYMENT.expireYear') } value={this.state.expireYear} onChange={(evt) => this.setState({expireYear: evt.target.value})}  minLength="2" maxLength="2" validate={{number: true}} required/>
                <AvFeedback>{ t('CREATE_PAYMENT.invalidExpirationDateYear') }</AvFeedback>
              </AvGroup>
            </Col>
            <Col md={6} lg={2}>
              <AvGroup>
                <Label for="securityCode">{ t('CREATE_PAYMENT.securityCode') }</Label>
                <AvInput type="text" name="securityCode" id="securityCode" placeholder={ t('CREATE_PAYMENT.securityCode') } value={this.state.securityCode} onChange={(evt) => this.setState({securityCode: evt.target.value})}  minLength="3" maxLength="3" validate={{number: true}} required/>
                <AvFeedback>{ t('CREATE_PAYMENT.invalidSecurityCode') }</AvFeedback>
              </AvGroup>
            </Col>
          </Row>
          <Row>
            {/* <Col md={6}>
              <AvGroup>
                <Label for="country">{ t('CREATE_PAYMENT.country') }</Label>
                <AvInput type="text" name="country" id="country" placeholder={ t('CREATE_PAYMENT.country') } value={this.state.country} onChange={(evt) => this.setState({country: evt.target.value})}
                  pattern="^[a-zA-Z]*$" minLength="3" maxLength="20" required/>
                <AvFeedback>{ t('CREATE_PAYMENT.invalidCountry') }</AvFeedback>
              </AvGroup>
            </Col> */}
            <Col md={6}>
              <AvGroup>
                <Label for="zipCode">{ t('CREATE_PAYMENT.zipCode') }</Label>
                <AvInput type="text" name="zipCode" id="zipCode" placeholder={ t('CREATE_PAYMENT.zipCode') } value={this.state.zipCode} onChange={(evt) => this.setState({zipCode: evt.target.value})} minLength="4" maxLength="5" validate={{number: true}} required/>
                <AvFeedback>{ t('CREATE_PAYMENT.invalidPostalCode') }</AvFeedback>
              </AvGroup>
            </Col>
          </Row>
            <AvGroup>
              <Button disabled={this.state.loading} type="submit" className="d-block mx-auto mt-4" color="primary">
              { t('PAYMENT_METHODS.addPayment') }
              </Button>
            </AvGroup>
          </AvForm>
      </Container>
    </div>)}</I18n>);
  }

  createPayment(evt) {
    this.isLoading(true);

    const createPaymentForm = new CreatePaymentForm(
      this.state.firstName,
      this.state.lastName,
      this.state.cardNumber,
      this.state.expireMonth,
      this.state.expireYear,
      this.state.securityCode,
      this.state.zipCode,
    );

    CreatePaymentActions.createPayment(createPaymentForm);
  }

  isLoading(isLoading) {
    this.setState({ loading: isLoading });
  }
}

export default CreatePayment;
