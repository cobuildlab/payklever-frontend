import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import { toast } from 'react-toastify';
import * as resetPasswordActions from './reset-password.actions';
import './reset-password.css';
import { Link } from 'react-router-dom';
import { Loading } from '../components';
import {
  WhiteLogo,
  PaykleverBg,
} from '../../assets';
import { authStore } from '../../stores';
import {
  Container,
  Col,
  Row,
  Button,
  Card,
  CardBody,
  CardTitle,
} from 'reactstrap';
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
} from 'availity-reactstrap-validation';
import { signupAvForm } from '../signup/signup.validators';

class RecoverPassword extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      code: props.match.params.code || '',
      password: '',
      repeatPassword: '',
    };

    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.resetPasswordSubscription = authStore
      .subscribe('resetPassword', (res) => {
        this.isLoading(false);
        toast.dismiss();
        toast.success(i18next.t('RESET_PASSWORD.passwordChanged'));
        this.props.history.push(`/login`);
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
    this.resetPasswordSubscription.unsubscribe();
    this.authStoreError.unsubscribe();

    document.body.style.backgroundImage = '';
    document.body.style.backgroundRepeat = '';
    document.body.style.backgroundPosition = '';
    document.body.style.backgroundSize = '';
    document.body.style.backgroundAttachment = '';
  }

  render() {
    return (
      <I18n>{(t, { i18n }) => (<Container>

      <Loading isLoading={this.state.loading} loadingMessage={ t('RESET_PASSWORD.resettingPassword') }></Loading>

      <Row className="mt-2 mb-5">
        <Col className="mt-5 mb-5 text-center"  md={{size: 12,}}>
          <img src={WhiteLogo} className="img-fluid Login-logo" alt="payklever"/>
        </Col>
        {/* <Row>
          <Col md={{
              size: 4,
              padding: 0,
              offset: 2,
            }}>
            <h2 className="text-left title">Ambitioni dedisse scripsisse iudicaretur.</h2>
          <p className="text-left subTitle">Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus. Praeterea iter est quasdam res quas ex communi. At nos hinc posthac, sitientis piros Afros.</p>
          </Col> */}
          <Col md={{
              size: 6,
              offset: 3,
            }}>
            <Card>
              <CardBody>
                <CardTitle tag="h2" className="text-center">
                  { t('RESET_PASSWORD.resetPassword') }
                </CardTitle>
                <AvForm onValidSubmit={(evt) => this.resetPassword(evt)} noValidate>
                  <AvGroup>
                    <AvInput type="text" name="code" id="password" placeholder={ t('RESET_PASSWORD.code') } value={this.state.code} onChange={(evt) => this.setState({code: evt.target.value})} required/>
                    <AvFeedback>{ t('RESET_PASSWORD.emptyCode') }</AvFeedback>
                  </AvGroup>
                  <AvGroup>
                    <AvInput type="password" name="password" id="password" placeholder={ t('SIGNUP.password') } value={this.state.password} onChange={(evt) => this.setState({password: evt.target.value})} validate={signupAvForm.password}/>
                    <AvFeedback>{ t('SIGNUP.invalidPassword') }</AvFeedback>
                  </AvGroup>
                  <AvGroup>
                    <AvInput type="password" name="repeatPassword" id="repeatPassword" placeholder={ t('SIGNUP.repeatPassword') } value={this.state.repeatPassword}  onChange={(evt) => this.setState({repeatPassword: evt.target.value})} validate={signupAvForm.repeatPassword}/>
                    <AvFeedback>{ t('SIGNUP.passwordNotMatch') }</AvFeedback>
                  </AvGroup>
                  <AvGroup>
                    <Button color="primary" type="submit" size="lg" block>{ t('RESET_PASSWORD.resetPassword') }</Button>
                  </AvGroup>
                  <AvGroup>
                    <Link to="/recover-password" className="recover">
                      <p className="text-center">
                        { t('RESET_PASSWORD.dontHaveCode') }
                      </p>
                    </Link>
                    <Link to="/login" className="recover">
                      <p className="text-center">
                        { t('LOGIN.login') }
                      </p>
                    </Link>
                  </AvGroup>
                </AvForm>
              </CardBody>
            </Card>
          </Col>
        {/* </Row> */}
      </Row>
    </Container> )}</I18n>)
  }

  resetPassword(evt) {
    this.isLoading(true);

    resetPasswordActions.resetPassword(this.state.password, this.state.repeatPassword, this.state.code);
  }

  isLoading(isLoading) {
    this.setState({ loading: isLoading });
  }
}

export default RecoverPassword;
