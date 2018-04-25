import React, { Component } from 'react';
import {
  SubNav
} from '../../components';
import { CreateCampaignForm } from './create-campaign.classes';
import * as CreateCampaignActions from './create-campaign.actions';
import { i18next } from '../../../i18n';
import { toast } from 'react-toastify';
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

class CreateCampaign extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
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

    this.isLoading = this.isLoading.bind(this);
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
          <Button disabled={this.state.loading} color="primary" type="submit" size="lg" block>
            { t('CREATE_CAMPAIGN.createCampaign') }
          </Button>
        </AvGroup>
      </AvForm>
  </Container>
</div>)}</I18n>);
  }

  createCampaign(evt) {
    this.isLoading(true);

    const createCampaignForm = new CreateCampaignForm(
      this.state.name,
      this.state.messageTitle,
      this.state.messageDescription,
    );

    CreateCampaignActions.createCampaign(createCampaignForm)
      .then((res) => {
        this.isLoading(false);
        toast.dismiss();
        toast.success(i18next.t('CREATE_CAMPAIGN.campaignCreated'));
        this.props.history.push('/client/campaigns');
      })
      .catch((err) => {
        this.isLoading(false);
        toast.dismiss();
        toast.error(err.message || i18next.t('FETCH.error'));
      });
  }

  isLoading(isLoading) {
    this.setState({ loading: isLoading });
  }
}

export default CreateCampaign;
