import React, { Component } from 'react';
import { SubNav } from '../../components';
import { CreateAccountForm } from './create-account.classes';
import * as createAccountActions from './create-account.actions';
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
      name: '',
      location: '',
      paymediaId: '',
      paymentMethods: [{
        id: 1,
        firstName: 'Jose',
        lastName: 'Villalobos',
        cardNumber: '************4561'
      }, {
        id: 2,
        firstName: 'Agustin',
        lastName: 'Vargas',
        cardNumber: '************8571'
      }]
    };
  }

  render() {
    return (<I18n>{(t, { i18n }) => (<div>
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
              <AvInput type="text" name="name" id="name" placeholder={ t('CREATE_ACCOUNT.accountName') } value={this.state.name} onChange={(evt) => this.setState({name: evt.target.value})} minLength="4" maxLength="10" required/>
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
              <AvInput onChange={(evt) => this.setState({paymediaId: evt.target.value})} value={this.state.paymediaId} type="select" name="paymediaId" label={ t('CREATE_ACCOUNT.paymentMethod') } required>
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
              <Button type="submit" className="d-block mx-auto mt-4" color="primary">
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
    const createAccountForm = new CreateAccountForm(
      this.state.name,
      this.state.paymediaId,
    );

    createAccountActions.createAccount(createAccountForm)
      .then((res) => {
        this.props.history.push('/client/profile/accounts');
      })
      .catch((err) => console.log('err', err));
  }
}

export default CreateAccount;
