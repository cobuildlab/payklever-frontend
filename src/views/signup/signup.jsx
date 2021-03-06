import React, { Component } from 'react';
import {
  I18n
} from 'react-i18next';
import { i18next } from '../../i18n';
import { toast } from 'react-toastify';
import { authStore } from '../../stores';
import { Link } from 'react-router-dom';
import { Loading } from '../components';
import './signup.css';
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
  WhiteLogo,
  PaykleverBg,
} from '../../assets';
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
} from 'availity-reactstrap-validation';
import * as signupActions from './signup.actions';
import { signupAvForm } from './signup.validators';
import { SignupForm } from './signup.classes';

class Signup extends Component {

  constructor() {
    super();
    this.state = {
      loading: false,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repeatPassword: ''
    };

    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.signupSubscription = authStore.subscribe('signup', (user) => {
      this.isLoading(false);
      toast.dismiss();
      toast.success(i18next.t('SIGNUP.youHaveRegistered'));
      this.props.history.push('/login');
    });

    this.authStoreError = authStore.subscribe('AuthStoreError', (err) => {
      this.isLoading(false);
      toast.dismiss();
      toast.error(err.message || i18next.t('FETCH.error'));
    });

    document.body.style.backgroundImage = `url(${PaykleverBg})`;
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundAttachment = 'fixed';
  }

  componentWillUnmount() {
    this.signupSubscription.unsubscribe();
    this.authStoreError.unsubscribe();


    document.body.style.backgroundImage = '';
    document.body.style.backgroundRepeat = '';
    document.body.style.backgroundPosition = '';
    document.body.style.backgroundSize = '';
    document.body.style.backgroundAttachment = '';
  }

  render() {
    return (<I18n>{(t, { i18n }) => (<Container>

      <Loading isLoading={this.state.loading} loadingMessage={ t('SIGNUP.signingUp') }></Loading>

      <Row className="mt-2 mb-5">
        <Col className="mt-5 mb-5 text-center"  md={{size: 12,}}>
          <img src={WhiteLogo} className="img-fluid signup-logo" alt="payklever"/>
        </Col>
        {/* <Row>
          <Col md={{
              size: 4,
              offset: 2
            }}>
            <h2 className="text-left title">Ambitioni dedisse scripsisse iudicaretur.</h2>
          <p className="text-left subTitle">Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus. Praeterea iter est quasdam res quas ex communi. At nos hinc posthac, sitientis piros Afros. Petierunt uti sibi concilium totius Galliae in diem certam indicere. Cras mattis iudicium purus sit amet fermentum.</p>
          </Col> */}
          <Col md={{
              size: 6,
              offset: 3,
            }}>
            <Card>
              <CardBody>
                <CardTitle tag="h1" className="text-center">{ t('SIGNUP.signup') }</CardTitle>
                <AvForm onValidSubmit={(evt) => this.signup(evt)} noValidate>
                  <AvGroup>
                    <AvInput type="text" name="firstName" id="firstName" placeholder={ t('SIGNUP.firstName') } value={this.state.firstName} onChange={(evt) => this.setState({firstName: evt.target.value})} validate={signupAvForm.firstName}/>
                    <AvFeedback>{ t('SIGNUP.invalidFirstName') }</AvFeedback>
                  </AvGroup>
                  <AvGroup>
                    <AvInput type="text" name="lastName" id="lastName" placeholder={ t('SIGNUP.lastName') } value={this.state.lastName} onChange={(evt) => this.setState({lastName: evt.target.value})} validate={signupAvForm.lastName}/>
                    <AvFeedback>{ t('SIGNUP.invalidLastName') }</AvFeedback>
                  </AvGroup>
                  <AvGroup>
                    <AvInput type="email" name="email" id="email" placeholder={ t('SIGNUP.email') } value={this.state.email} onChange={(evt) => this.setState({email: evt.target.value})} validate={signupAvForm.email}/>
                    <AvFeedback>{ t('SIGNUP.invalidEmail') }</AvFeedback>
                  </AvGroup>
                  <AvGroup>
                    <AvInput type="password" name="password" id="password" placeholder={ t('SIGNUP.password') } value={this.state.password} onChange={(evt) => this.setState({password: evt.target.value})} validate={signupAvForm.password}/>
                    <AvFeedback>{ t('SIGNUP.invalidPassword') }</AvFeedback>
                  </AvGroup>
                  <AvGroup>
                    <AvInput type="password" name="repeatPassword" id="repeatPassword" placeholder={ t('SIGNUP.repeatPassword') } value={this.state.repeatPassword}  onChange={(evt) => this.setState({repeatPassword: evt.target.value})} validate={signupAvForm.repeatPassword}/>
                    <AvFeedback>{ t('SIGNUP.passwordNotMatch') }</AvFeedback>
                  </AvGroup>
                  <AvGroup check className="mt-2 mb-2">
                    <Label check>
                      <AvInput className="terminos" type="checkbox" name="checkbox" validate={signupAvForm.privacyPolicy}/>
                      {' '} <Link to="/terms-privacy/terms" target="_blank">{ t('SIGNUP.privacyPolicy') }</Link>
                      <AvFeedback>{ t('SIGNUP.acceptPrivacy') }</AvFeedback>
                    </Label>
                  </AvGroup>
                  <AvGroup>
                    <Button color="primary" type="submit" size="lg" block>
                      { t('SIGNUP.signup') }
                    </Button>
                  </AvGroup>
                  <Link to="/login" className="recover-login">
                    <p className="text-center">
                      { t('SIGNUP.recoverLogin') }
                    </p>
                  </Link>
                </AvForm>
              </CardBody>
            </Card>
          </Col>
        {/* </Row> */}
      </Row>
    </Container>)}</I18n>)
  }

  signup(evt, values) {
    this.isLoading(true);

    const signupForm = new SignupForm(
      this.state.firstName,
      this.state.lastName,
      this.state.email,
      this.state.password,
    );

    signupActions.signup(signupForm);
  }

  isLoading(isLoading) {
    this.setState({ loading: isLoading });
  }
}

export default Signup;
