import React from 'react';
import Flux from '@4geeksacademy/react-flux-dash';
import {
  I18n
} from 'react-i18next';
import {
  Container,
  Col,
  Row,
  Button,
  Card,
  CardBody,
  CardTitle,
  Label
} from 'reactstrap';
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
} from 'availity-reactstrap-validation';
import signupActions from './signup.actions';
import { SignupForm } from './signup.classes';


class Signup extends Flux.View {

  constructor() {
    super();
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      repeatPassword: ''
    };
  }

  render() {
    return (<I18n>{(t, { i18n }) => (<Container>
      <Row>
        <Col md={{
            size: 4,
            offset: 2
          }}>
          <h2 className="text-left">Ambitioni dedisse scripsisse iudicaretur.</h2>
          <p className="text-left">Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus. Praeterea iter est quasdam res quas ex communi. At nos hinc posthac, sitientis piros Afros. Petierunt uti sibi concilium totius Galliae in diem certam indicere. Cras mattis iudicium purus sit amet fermentum.</p>
        </Col>
        <Col md={{
            size: 4
          }}>
          <Card>
            <CardBody>
              <CardTitle tag="h1" className="text-center">{ t('SIGNUP.signup') }</CardTitle>
              <AvForm onValidSubmit={(evt) => this.signup(evt)} noValidate>
                <AvGroup>
                  <AvInput type="text" name="firstname" id="firstname" placeholder={ t('SIGNUP.firstname') } value={this.state.firstname} onChange={(evt) => this.setState({firstname: evt.target.value})} minLength="3" maxLength="40" required/>
                  <AvFeedback>{ t('SIGNUP.invalidFirstname') }</AvFeedback>
                </AvGroup>
                <AvGroup>
                  <AvInput type="text" name="lastname" id="lastname" placeholder={ t('SIGNUP.lastname') } value={this.state.lastname} onChange={(evt) => this.setState({lastname: evt.target.value})} minLength="3" maxLength="40" required/>
                  <AvFeedback>{ t('SIGNUP.invalidLastname') }</AvFeedback>
                </AvGroup>
                <AvGroup>
                  <AvInput type="email" name="email" id="email" placeholder={ t('SIGNUP.email') } value={this.state.email} onChange={(evt) => this.setState({email: evt.target.value})} required/>
                  <AvFeedback>{ t('SIGNUP.invalidEmail') }</AvFeedback>
                </AvGroup>
                <AvGroup>
                  <AvInput type="password" name="password" id="password" placeholder={ t('SIGNUP.password') } value={this.state.password} onChange={(evt) => this.setState({password: evt.target.value})} minLength="8" maxLength="12" required/>
                  <AvFeedback>{ t('SIGNUP.invalidPassword') }</AvFeedback>
                </AvGroup>
                <AvGroup>
                  <AvInput type="password" name="repeatPassword" id="repeatPassword" placeholder={ t('SIGNUP.repeatPassword') } value={this.state.repeatPassword}  onChange={(evt) => this.setState({repeatPassword: evt.target.value})} validate={{match:{value:'password'}}} required/>
                  <AvFeedback>{ t('SIGNUP.passwordNotMatch') }</AvFeedback>
                </AvGroup>
                <AvGroup check>
                  <Label check>
                    <AvInput type="checkbox" name="checkbox" required/>
                    {' '} <a href="#">{ t('SIGNUP.privacyPolicy') }</a>
                    <AvFeedback>{ t('SIGNUP.acceptPrivacy') }</AvFeedback>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Button color="primary" type="submit" size="lg" block>
                    { t('SIGNUP.signup') }
                  </Button>
                </AvGroup>
              </AvForm>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>)}</I18n>)
  }

  signup(evt, values) {
    const signupForm = new SignupForm(
      this.state.firstname,
      this.state.lastname,
      this.state.email,
      this.state.password,
    );

    signupActions.signup(signupForm)
      .then((res) => {
        this.props.history.push('/login');
      })
      .catch((err) => console.log('err', err));
  }
}

export default Signup;
