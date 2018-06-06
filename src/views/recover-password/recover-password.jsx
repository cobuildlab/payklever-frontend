import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { i18next } from '../../i18n';
import { toast } from 'react-toastify';
import * as recoverPasswordActions from './recover-password.actions';
import './recover-password.css';
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

class RecoverPassword extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      email: '',
    };

    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.recoverPasswordSubscription = authStore
      .subscribe('recoverPassword', (res) => {
        this.isLoading(false);
        toast.dismiss();
        toast.success(i18next.t('RECOVER_PASSWORD.emailSubmitted'));
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
    this.recoverPasswordSubscription.unsubscribe();
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

      <Loading isLoading={this.state.loading} loadingMessage={ t('RECOVER_PASSWORD.submittingEmail') }></Loading>

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
                  { t('RECOVER_PASSWORD.recoverPassword') }
                </CardTitle>
                <AvForm onValidSubmit={(evt) => this.login(evt)} noValidate>
                  <AvGroup>
                    <AvInput type="email" name="email" id="email" placeholder={ t('LOGIN.email') } value={this.state.email} onChange={(evt) => this.setState({email: evt.target.value})} required/>
                    <AvFeedback>{ t('LOGIN.invalidEmail') }</AvFeedback>
                  </AvGroup>
                  <AvGroup>
                    <Button color="primary" type="submit" size="lg" block>{ t('RECOVER_PASSWORD.submitEmail') }</Button>
                  </AvGroup>
                  <AvGroup>
                    <Link to="/reset-password/" className="recover">
                      <p className="text-center">
                        { t('RECOVER_PASSWORD.resetPassword') }
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

    recoverPasswordActions.recoverPassword(this.state.email);
  }

  isLoading(isLoading) {
    this.setState({ loading: isLoading });
  }
}

export default RecoverPassword;
