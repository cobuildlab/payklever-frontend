import React from 'react';
import Flux from '@4geeksacademy/react-flux-dash';
import {
  SubNav
} from '../../components';
import { CreateCampaignForm } from './create-campaign.classes';
import CreateCampaignActions from './create-campaign.actions';
import {
  I18n
} from 'react-i18next';
import {
  Container,
  Col,
  Row,
  Button,
  Label,
} from 'reactstrap';
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
  AvRadioGroup,
  AvRadio,
} from 'availity-reactstrap-validation';

class CreateCampaign extends Flux.View {
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
          <AvInput type="text" name="messageDescription" id="messageDescription" placeholder={ t('CREATE_CAMPAIGN.messageDescription') } value={this.state.messageDescription} onChange={(evt) => this.setState({messageDescription: evt.target.value})} required/>
          <AvFeedback>{ t('CREATE_CAMPAIGN.invalidMessageDescription') }</AvFeedback>
        </AvGroup>
        <AvRadioGroup inline name="gender" label={ t('CREATE_CAMPAIGN.gender') } errorMessage={ t('CREATE_CAMPAIGN.invalidGender') }>
            {this.state.genderlist.map((gender) => <AvRadio key={gender.id} label={gender.gender} value={gender.gender} />)}
        </AvRadioGroup>
        <AvGroup>
          <Button color="primary" type="submit" size="lg" block>
            { t('CREATE_CAMPAIGN.createCampaign') }
          </Button>
        </AvGroup>
      </AvForm>
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