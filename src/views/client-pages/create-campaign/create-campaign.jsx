import React, { Component } from 'react';
import {
  SubNav
} from '../../components';
import { CreateCampaignForm } from './create-campaign.classes';
import * as CreateCampaignActions from './create-campaign.actions';
import {
  I18n
} from 'react-i18next';
import {
  Container,
  Col,
  Row,
  Button,
  Label,
  Form,
  FormGroup,
  Input,
  FormText,
} from 'reactstrap';
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
  AvRadioGroup,
  AvRadio,
} from 'availity-reactstrap-validation';

class CreateCampaign extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      messageTitle: '',
      messageDescription: '',
      gender: '',
      genderlist: [{
          id: 1,
          gender: 'male',
        },
        {
          id: 2,
          gender: 'female',
        },
        {
          id: 3,
          gender: 'all',
        },
      ],
      age: [],
      ageList: [{
          id: 1,
          age: '10 - 20',
        },
        {
          id: 2,
          age: '20 - 35',
        },
      ],
      education: [],
      status: [],
      income: [],
      incomelist: [{
          id: 1,
          income: '100$ to 200$',
        },
        {
          id: 2,
          income: '200$ to 350$',
        },
      ],
      bid: '',
      date: '',
      account: '',
    };
  }

  render() {
    return (<I18n>{(t, { i18n }) => (<div>
      <SubNav titleI18n="CREATE_CAMPAIGN.createCampaign"></SubNav>

      <Container className="mt-4">
      <Row className="mb-5 d-flex align-items-stretch">
        <Col className="divider-col" md={{size: 9}}>
          <AvForm onValidSubmit={(evt) => this.createCampaign(evt)} noValidate>
            <AvGroup>
              <AvInput type="text" name="name" id="name" placeholder={ t('CREATE_CAMPAIGN.name') } value={this.state.name} onChange={(evt) => this.setState({name: evt.target.value})}  minLength="6" maxLength="40" required/>
              <AvFeedback>{ t('CREATE_CAMPAIGN.invalidName') }</AvFeedback>
            </AvGroup>
            <AvGroup>
              <AvInput type="text" name="messageTitle" id="messageTitle" placeholder={ t('CREATE_CAMPAIGN.messageTitle') } value={this.state.messageTitle} onChange={(evt) => this.setState({messageTitle: evt.target.value})} required/>
              <AvFeedback>{ t('CREATE_CAMPAIGN.invalidMessageTitle') }</AvFeedback>
            </AvGroup>
            <AvGroup>
              <AvInput style={{height: 'auto'}} type="textarea" name="messageDescription" id="messageDescription" placeholder={ t('CREATE_CAMPAIGN.messageDescription') } value={this.state.messageDescription} onChange={(evt) => this.setState({messageDescription: evt.target.value})} required/>
              <AvFeedback>{ t('CREATE_CAMPAIGN.invalidMessageDescription') }</AvFeedback>
            </AvGroup>
            <Col className="p-0 mt-3 mb-3 bg-dark" md={{size: 12}}>
              <p className="title-create">Matched audiences</p>
            </Col>
            <AvRadioGroup className="divider-select" inline name="gender" label={ t('CREATE_CAMPAIGN.gender') } errorMessage={ t('CREATE_CAMPAIGN.invalidGender') }>
                {this.state.genderlist.map((gender) => <AvRadio key={gender.id} label={gender.gender} value={gender.gender} />)}
            </AvRadioGroup>
            <AvRadioGroup className="divider-select" inline name="gender" label={ t('CREATE_CAMPAIGN.gender') } errorMessage={ t('CREATE_CAMPAIGN.invalidGender') }>
                {this.state.genderlist.map((gender) => <AvRadio key={gender.id} label={gender.gender} value={gender.gender} />)}
            </AvRadioGroup>
            <AvRadioGroup className="divider-select" inline name="gender" label={ t('CREATE_CAMPAIGN.gender') } errorMessage={ t('CREATE_CAMPAIGN.invalidGender') }>
                {this.state.genderlist.map((gender) => <AvRadio key={gender.id} label={gender.gender} value={gender.gender} />)}
            </AvRadioGroup>
            <AvRadioGroup className="divider-select" inline name="gender" label={ t('CREATE_CAMPAIGN.gender') } errorMessage={ t('CREATE_CAMPAIGN.invalidGender') }>
                {this.state.genderlist.map((gender) => <AvRadio key={gender.id} label={gender.gender} value={gender.gender} />)}
            </AvRadioGroup>
            <Col className="p-0 mt-3 mb-3 bg-dark" md={{size: 12}}>
              <p className="title-create">Budget and Programming</p>
            </Col>
            <FormGroup className="mt-3 mb-3 divider-select">
              <Label for="exampleEmail">Bid per Click</Label>
            <Input className="mb-3" type="email" name="email" id="exampleEmail" placeholder="$" />
            </FormGroup>
            <Label for="exampleEmail">Date</Label>
            <Form className="mb-3 mt-3 divider-select" inline>
              <FormGroup className="mb-4 mr-sm-3 mb-sm-0">
                <Label for="exampleEmail" className="mr-sm-2">Start</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="something@idk.cool" />
              </FormGroup>
              <FormGroup className="mb-4 mr-sm-3 mb-sm-0">
                <Label for="examplePassword" className="mr-sm-2">Stop</Label>
                <Input type="password" name="password" id="examplePassword" placeholder="don't tell!" />
              </FormGroup>
            </Form>
            <AvRadioGroup className="divider-select" inline name="gender" label={ t('CREATE_CAMPAIGN.gender') } errorMessage={ t('CREATE_CAMPAIGN.invalidGender') }>
                {this.state.genderlist.map((gender) => <AvRadio key={gender.id} label={gender.gender} value={gender.gender} />)}
            </AvRadioGroup>
            <FormGroup className="mb-3 mt-3">
                <Label for="exampleSelect">Selecionar Metodo de Pago</Label>
                <Input type="select" name="select" id="exampleSelect">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>
          </AvForm>
        </Col>
        <Col md={{size: 3}}>
          <AvForm>
          <AvGroup>
            <Button color="primary" type="submit" size="lg" block>
              { t('CREATE_CAMPAIGN.createCampaign') }
            </Button>
          </AvGroup>
          </AvForm>
        </Col>
      </Row>
  </Container>
</div>)}</I18n>);
  }

  createCampaign(evt) {
    const createCampaignForm = new CreateCampaignForm(
      this.state.name,
      this.state.messageTitle,
      this.state.messageDescription,
    );

    CreateCampaignActions.createCampaign(createCampaignForm)
      .then((res) => {
        this.props.history.push('/client/campaigns');
      })
      .catch((err) => console.log('err', err));
  }
}

export default CreateCampaign;
