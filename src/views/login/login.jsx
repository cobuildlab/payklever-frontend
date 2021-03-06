import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import { toast } from 'react-toastify';
import * as loginActions from './login.actions';
import './login.css';
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

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      email: '',
      password: '',
    };

    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.setUserSubscription = authStore.subscribe('setUser', (user) => {
      this.isLoading(false);
      if (user) {
        toast.dismiss();
        toast.success(i18next.t('LOGIN.youHaveLoggedIn'));
        this.props.history.push('/client');
      }
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

    setTimeout(() => {
      if (this.props.location.pathname === '/login/email-confirmation') {
        toast.dismiss();
        toast.success(i18next.t('LOGIN.emailConfirmed'), { autoClose: 10000 });
      }

      if (this.props.location.pathname === '/login/email-confirmation-error') {
        toast.dismiss();
        toast.error(i18next.t('LOGIN.emailConfirmedError'), { autoClose: 10000 });
      }
    }, 2000);
  }

  componentWillUnmount() {
    this.setUserSubscription.unsubscribe();
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

      <Loading isLoading={this.state.loading} loadingMessage={ t('LOGIN.loggingIn') }></Loading>

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
                <CardTitle tag="h1" className="text-center">
                  { t('LOGIN.login') }
                </CardTitle>
                <AvForm onValidSubmit={(evt) => this.login(evt)} noValidate>
                  <AvGroup>
                    <AvInput type="email" name="email" id="email" placeholder={ t('LOGIN.email') } value={this.state.email} onChange={(evt) => this.setState({email: evt.target.value})} required/>
                    <AvFeedback>{ t('LOGIN.invalidEmail') }</AvFeedback>
                  </AvGroup>
                  <AvGroup>
                    <AvInput type="password" name="password" id="password" placeholder={ t('LOGIN.password') } value={this.state.password} onChange={(evt) => this.setState({password: evt.target.value})} required/>
                    <AvFeedback>{ t('LOGIN.emptyPassword') }</AvFeedback>
                  </AvGroup>
                  <AvGroup>
                    <Button color="primary" type="submit" size="lg" block>{ t('LOGIN.login') }</Button>
                  </AvGroup>
                  <AvGroup>
                    <Link to="/recover-password" className="recover">
                      <p className="text-center">
                        { t('LOGIN.forgotPassword') }
                      </p>
                    </Link>
                    <Link to="/signup" className="recover">
                      <p className="text-center">
                        { t('LOGIN.register') }
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

  login(evt) {
    this.isLoading(true);

    loginActions.login(this.state.email, this.state.password);
  }

  isLoading(isLoading) {
    this.setState({ loading: isLoading });
  }
}

export default Login;
