import React from 'react';
import Flux from '@4geeksacademy/react-flux-dash';
import { I18n } from 'react-i18next';
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

export class Login extends Flux.View {

  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

  render() {
    return (
      <I18n>{(t, { i18n }) => (<Container>
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
              <CardTitle tag="h1" className="text-center">{ t('LOGIN.login') }</CardTitle>
              <Form onSubmit={(evt) => this.login(evt)} noValidate>
                <FormGroup>
                  <Input type="email" name="email" id="email" placeholder={ t('LOGIN.email') } value={this.state.email} onChange={(evt) => this.setState({email: evt.target.value})}/>
                </FormGroup>
                <FormGroup>
                  <Input type="password" name="password" id="password" placeholder={ t('LOGIN.password') } value={this.state.password} onChange={(evt) => this.setState({password: evt.target.value})}/>
                </FormGroup>
                <FormGroup>
                  <Button color="primary" type="submit" size="lg" block>{ t('LOGIN.login') }</Button>
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
    this.props.history.push('/pages');
  }
}
