import React from 'react';
import Flux from '@4geeksacademy/react-flux-dash';
import {
  I18n
} from 'react-i18next';
import loginActions from './login.actions';
import './login.css';
import {
  WhiteLogo,
  PaykleverBg,
} from '../../assets';

import {
  AuthStore
} from '../../stores';
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

class Login extends Flux.View {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.bindStore(AuthStore, 'USER_ADDED', function() {
      props.history.push('/client');
    });
  }

  componentDidMount() {
    document.body.style.backgroundImage = `url(${PaykleverBg})`;
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundSize = 'cover';
  }

  componentWillUnmount() {
    document.body.style.backgroundImage = '';
    document.body.style.backgroundRepeat = '';
    document.body.style.backgroundPosition = '';
    document.body.style.backgroundSize = '';
  }

  render() {
    return (
      <I18n>{(t, { i18n }) => (<Container>
      <Row>
        <Col className="Login-contentLogo text-center"  md={{size: 12,}}>
          <img src={WhiteLogo} width="400" alt="payklever"/>
        </Col>
        <Col md={{
            size: 4,
            padding: 0,
          }}>
          <h2 className="text-left title">Ambitioni dedisse scripsisse iudicaretur.</h2>
        <p className="text-left subTitle">Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit amet fermentum. Donec sed odio operae, eu vulputate felis rhoncus. Praeterea iter est quasdam res quas ex communi. At nos hinc posthac, sitientis piros Afros.</p>
        </Col>
        <Col md={{
            size: 5
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
                  <AvFeedback>{ t('LOGIN.passwordRequired') }</AvFeedback>
                </AvGroup>
                <AvGroup>
                  <Button color="primary" type="submit" size="lg" block>{ t('LOGIN.login') }</Button>
                </AvGroup>
                <AvGroup>
                  <a href="#" className="recover">
                    <p className="text-center">
                      { t('LOGIN.recoverPassword') }
                    </p>
                  </a>
                </AvGroup>
              </AvForm>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container> )}</I18n>)
  }

  login(evt) {
    loginActions.login({
      email: this.state.email,
      password: this.state.password
    });
  }
}

export default Login;
