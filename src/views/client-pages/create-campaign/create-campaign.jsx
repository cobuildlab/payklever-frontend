import React, { Component } from 'react';
import {
  SubNav
} from '../../components';
import { CreateCampaignForm } from './create-campaign.classes';
import * as CreateCampaignActions from './create-campaign.actions';
import { createCampaignAvForm } from './create-campaign.validators';
import { i18next } from '../../../i18n';
import { campaignStore } from '../../../stores';
import { toast } from 'react-toastify';
import { CSSTransition } from 'react-transition-group';
import { RingLoader } from 'react-spinners';
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
          text: '10 - 20',
        },
        {
          id: 2,
          text: '20 - 35',
        },
      ],
      education: [],
      educationList: [{
          id: 1,
          text: 'High school degree',
        },
        {
          id: 2,
          text: `Master's degree`,
        },
        {
          id: 3,
          text: `Collage degree`,
        },
      ],
      civilStatus: [],
      civilStatusList: [{
          id: 1,
          text: 'Single',
        },
        {
          id: 2,
          text: `Divorced`,
        },
        {
          id: 3,
          text: `Married`,
        }
      ],
      hourHand: [],
      hourHandList: [{
          id: 1,
          text: '10am to 12pm',
        },
        {
          id: 2,
          text: '12pm to 2pm',
        },
      ],
      paymediaId: '',
      bidPerClick: '',
      date: '',
      account: '',
    };

    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.createCampaignSubscription = campaignStore
      .subscribe('createCampaign', (campaign) => {
        this.isLoading(false);
        toast.dismiss();
        toast.success(i18next.t('CREATE_CAMPAIGN.campaignCreated'));
        this.props.history.push('/client/campaigns');
      });

    this.campaignStoreError = campaignStore
      .subscribe('CampaignStoreError', (err) => {
        this.isLoading(false);
        toast.dismiss();
        toast.error(err.message || i18next.t('FETCH.error'));
      });
  }

  componentWillUnmount() {
    this.createCampaignSubscription.unsubscribe();
    this.campaignStoreError.unsubscribe();
  }

  render() {
    return (<I18n>{(t, { i18n }) => (<div>

    <CSSTransition in={this.state.loading} timeout={500} classNames="fade-in" unmountOnExit>
      <div className="App-overlay">
        <div style={{width: '200px'}} className="App-center-loading">
          <h4 className="text-center">
            { t('CREATE_CAMPAIGN.creatingCampaign') }
          </h4>
          <RingLoader size={200} color={'#75c044'} loading={true}/>
        </div>
      </div>
    </CSSTransition>

      <SubNav titleI18n="CREATE_CAMPAIGN.createCampaign"></SubNav>

      <Container className="mt-4">
        <AvForm onValidSubmit={(evt) => this.createCampaign(evt)} noValidate>
      <Row className="mb-5 d-flex align-items-stretch">
        <Col className="divider-col" md={{size: 9}}>
            <AvGroup>
              <AvInput type="text" name="name" id="name" placeholder={ t('CREATE_CAMPAIGN.name') } value={this.state.name} onChange={(evt) => this.setState({name: evt.target.value})} validate={createCampaignAvForm.name}/>
              <AvFeedback>{ t('CREATE_CAMPAIGN.invalidName') }</AvFeedback>
            </AvGroup>
            <AvGroup>
              <AvInput type="text" name="messageTitle" id="messageTitle" placeholder={ t('CREATE_CAMPAIGN.messageTitle') } value={this.state.messageTitle} onChange={(evt) => this.setState({messageTitle: evt.target.value})} validate={createCampaignAvForm.messageTitle}/>
              <AvFeedback>{ t('CREATE_CAMPAIGN.invalidMessageTitle') }</AvFeedback>
            </AvGroup>
            <AvGroup>
              <AvInput style={{height: 'auto'}} type="textarea" name="messageDescription" id="messageDescription" placeholder={ t('CREATE_CAMPAIGN.messageDescription') } value={this.state.messageDescription} onChange={(evt) => this.setState({messageDescription: evt.target.value})} validate={createCampaignAvForm.messageDescription}/>
              <AvFeedback>{ t('CREATE_CAMPAIGN.invalidMessageDescription') }</AvFeedback>
            </AvGroup>
            <Col className="p-0 mt-3 mb-3 bg-dark" md={{size: 12}}>
              <p className="title-create">{ t('CREATE_CAMPAIGN.matchedAudiences') }</p>
            </Col>
            <AvRadioGroup className="divider-select" inline name="gender" label={ t('CREATE_CAMPAIGN.gender') } errorMessage={ t('CREATE_CAMPAIGN.invalidGender') }>
                {this.state.genderlist.map((gender) => <AvRadio key={gender.id} label={gender.gender} value={gender.gender} />)}
            </AvRadioGroup>
            <h4>{ t('CREATE_CAMPAIGN.age') }</h4>
            {this.state.ageList.map((age) =><AvGroup key={age.id} inline check>
                <Label check>
                  <AvInput name="age" type="checkbox" trueValue={age.id} falseValue={''} />{age.text}
                </Label>
            </AvGroup>)}
            <div className="divider-select mt-3 mb-3"></div>
            <h4>{ t('CREATE_CAMPAIGN.education') }</h4>
            {this.state.educationList.map((education) =><AvGroup key={education.id} inline check>
                <Label check>
                  <AvInput name="education" type="checkbox" key={education.id} trueValue={education.id} falseValue={''} />
                  {education.text}
                </Label>
            </AvGroup>)}
            <div className="divider-select mt-3 mb-3"></div>
            <h4>{ t('CREATE_CAMPAIGN.civilStatus') }</h4>
            {this.state.civilStatusList.map((civilStatus) =><AvGroup key={civilStatus.id} inline check>
                <Label check>
                  <AvInput name="civilStatus" type="checkbox" key={civilStatus.id} trueValue={civilStatus.id} falseValue={''} />
                  {civilStatus.text}
                </Label>
            </AvGroup>)}
            <Col className="p-0 mt-3 mb-3 bg-dark" md={{size: 12}}>
              <p className="title-create">{ t('CREATE_CAMPAIGN.budgetAndProgramming') }</p>
            </Col>
            <Row>
              <Col md={{size: 6}}>
                <AvGroup className="mr-sm-3 mb-sm-0" inline>
                  <Label for="startDate">{ t('CREATE_CAMPAIGN.startDate') }</Label>
                  <AvInput type="date" name="startDate" id="startDate" placeholder={ t('CREATE_CAMPAIGN.startDate') }/>
                </AvGroup>
              </Col>
              <Col md={{size: 6}}>
                <AvGroup className="mr-sm-3 mb-sm-0" inline>
                  <Label for="stopDate">{ t('CREATE_CAMPAIGN.stopDate') }</Label>
                  <AvInput type="date" name="stopDate" id="stopDate" placeholder={ t('CREATE_CAMPAIGN.stopDate') }/>
                </AvGroup>
              </Col>
            </Row>
            <div className="divider-select mt-3 mb-3"></div>
            <AvRadioGroup inline name="hourHand" label={ t('CREATE_CAMPAIGN.hourHand') } errorMessage={ t('CREATE_CAMPAIGN.invalidHourHand') }>
                {this.state.hourHandList.map((hourHand) => <AvRadio key={hourHand.id} label={hourHand.text} value={hourHand.id} />)}
            </AvRadioGroup>
        </Col>
        <Col md={{size: 3}}>
          <AvGroup>
            <Button color="primary" type="submit" size="lg" block>
              { t('CREATE_CAMPAIGN.createCampaign') }
            </Button>
          </AvGroup>
        </Col>
      </Row>
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

    CreateCampaignActions.createCampaign(createCampaignForm);
  }

  isLoading(isLoading) {
    this.setState({ loading: isLoading });
  }
}

export default CreateCampaign;
