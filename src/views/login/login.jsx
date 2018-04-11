import React from 'react';
import Flux from '@4geeksacademy/react-flux-dash';
import {
  I18n
} from 'react-i18next';
import loginActions from './login.actions';
import './login.css';
import Logo from '../../assets/img/logoWhite.png'

import {
  Container,
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Card,
  CardBody,
  CardTitle,
  Input
} from 'reactstrap';

class Login extends Flux.View {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  render() {
    return (
      <I18n>{(t, { i18n }) => (<Container>
      <Row>
        <Col className="contentLogo text-center"  md={{size: 12,}}>
          <img src={Logo} width="400" alt="payklever"/>
        </Col>
        <Col md={{
            size: 4,
            offset: 2,
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
              <CardTitle tag="h1" className="text-center">{ t('LOGIN.login') }</CardTitle>
              <Form onSubmit={(evt) => this.login(evt)} noValidate>
                <FormGroup>
                  <Input type="email" name="email" id="email" placeholder={ t('LOGIN.email') } value={this.state.email} onChange={(evt) => this.setState({email: evt.target.value})}/>
                </FormGroup>
                <FormGroup>
                  <Input type="password" name="password" id="password" placeholder={ t('LOGIN.password') } value={this.state.password} onChange={(evt) => this.setState({password: evt.target.value})}/>
                </FormGroup>
                <FormGroup>
                  <Button color="primary" className="mt-4" type="submit" size="lg" block>{ t('LOGIN.login') }</Button>
                </FormGroup>
                <FormGroup>
                  <a href="#">
                    <p className="text-center">{ t('LOGIN.recoverPassword') }</p>
                  </a>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container> )}</I18n>)
  }

  login(evt) {
    console.log("Login", evt);
    evt.preventDefault();
    loginActions.login({
      email: this.state.email,
      password: this.state.password
    });
  }
}

export default Login;
