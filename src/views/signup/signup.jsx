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
  Form,
  FormGroup,
  Card,
  CardBody,
  CardTitle,
  Input,
  Label
} from 'reactstrap';

class Signup extends Flux.View {

  constructor() {
    super();
    this.state = {
      name: '',
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
              <Form onSubmit={(evt) => this.signup(evt)} noValidate>
                <FormGroup>
                  <Input type="text" name="name" id="name" placeholder={ t('SIGNUP.name') } value={this.state.name} onChange={(evt) => this.setState({name: evt.target.value})}/>
                </FormGroup>
                <FormGroup>
                  <Input type="email" name="email" id="email" placeholder={ t('SIGNUP.email') } value={this.state.email} onChange={(evt) => this.setState({email: evt.target.value})}/>
                </FormGroup>
                <FormGroup>
                  <Input type="password" name="password" id="password" placeholder={ t('SIGNUP.password') } value={this.state.password} onChange={(evt) => this.setState({password: evt.target.value})}/>
                </FormGroup>
                <FormGroup>
                  <Input type="password" name="repeatPassword" id="repeatPassword" placeholder={ t('SIGNUP.repeatPassword') } value={this.state.repeatPassword} onChange={(evt) => this.setState({repeatPassword: evt.target.value})}/>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox"/>{' '}
                    <a href="#">{ t('SIGNUP.privacyPolicy') }</a>
                  </Label>
                </FormGroup>
                <FormGroup>
                  <Button color="primary" type="submit" size="lg" block>
                    { t('SIGNUP.signup') }
                  </Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>)}</I18n>)
  }

  signup(evt) {
    console.log("Signup", evt);
    evt.preventDefault();
    this.props.history.push('/login');
  }
}

export default Signup;