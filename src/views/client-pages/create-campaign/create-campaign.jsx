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
      genreId: '',
      genresList: [],
      ages: [],
      agesList: [],
      timeFrames: [],
      timeFramesList: [],
      estimatedIncomes: [],
      estimatedIncomesList: [],
      account: {},
      accountId: '',
      budget: '',
      startDate: '',
      endDate: '',
    };

    this.isLoading = this.isLoading.bind(this);
    this.checkItem = this.checkItem.bind(this);
    this.unCheckItem = this.unCheckItem.bind(this);
  }

  componentDidMount() {
    this.createCampaignSubscription = campaignStore
      .subscribe('createCampaign', (campaign) => {
        this.isLoading(false);
        toast.dismiss();
        toast.success(i18next.t('CREATE_CAMPAIGN.campaignCreated'));
        this.props.history.push('/client/campaigns');
      });

    this.getGenresSubscription = campaignStore
      .subscribe('getGenres', (genresList) => {
        this.setState({ genresList });
      });

    this.getAgesSubscription = campaignStore
      .subscribe('getAges', (agesList) => {
        this.setState({ agesList });
      });

    this.getEstimatedIncomesSubscription = campaignStore
      .subscribe('getEstimatedIncomes', (estimatedIncomesList) => {
        this.setState({ estimatedIncomesList });
      });

    this.getTimeframesSubscription = campaignStore
      .subscribe('getTimeFrames', (timeFramesList) => {
        this.setState({ timeFramesList });
      });

    this.campaignStoreError = campaignStore
      .subscribe('CampaignStoreError', (err) => {
        this.isLoading(false);
        toast.dismiss();
        toast.error(err.message || i18next.t('FETCH.error'));
      });

    CreateCampaignActions.getGenres();
    CreateCampaignActions.getAges();
    CreateCampaignActions.getEstimatedIncomes();
    CreateCampaignActions.getTimeFrames();
  }

  componentWillUnmount() {
    this.createCampaignSubscription.unsubscribe();
    this.getGenresSubscription.unsubscribe();
    this.getAgesSubscription.unsubscribe();
    this.getEstimatedIncomesSubscription.unsubscribe();
    this.getTimeframesSubscription.unsubscribe();
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
        <Col className="divider-col" md={{size: 8}}>
            <Col className="p-0 mt-3 mb-3 bg-dark" md={{size: 12}}>
              <p className="title-create">
                { t('CREATE_CAMPAIGN.accountInfo') }
              </p>
            </Col>
            <FormGroup>
              <Input disabled type="text" name="accountName" placeholder={t('CREATE_CAMPAIGN.accountName')} value={this.state.account.name}/>
            </FormGroup>
            <FormGroup>
              <Input disabled type="text" name="accountPayment" placeholder={t('CREATE_CAMPAIGN.accountPayment')} value={this.state.account.paymedia}/>
            </FormGroup>
            <FormGroup>
              <Input disabled type="text" name="accountLocation" placeholder={t('CREATE_CAMPAIGN.accountLocation')} value={this.state.account.location}/>
            </FormGroup>
            <Col className="p-0 mt-3 mb-3 bg-dark" md={{size: 12}}>
              <p className="title-create">
                { t('CREATE_CAMPAIGN.campaignInfo') }
              </p>
            </Col>
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
            <AvRadioGroup className="divider-select" inline name="genreId" label={ t('CREATE_CAMPAIGN.gender') } errorMessage={ t('CREATE_CAMPAIGN.invalidGender') } validate={createCampaignAvForm.genre}>
                {this.state.genresList.map((genre) => <AvRadio onChange={(evt) => this.setState({genreId: evt.target.value})} key={genre.id} label={ t(`CREATE_CAMPAIGN.${genre.name}`) } value={genre.id} />)}
            </AvRadioGroup>
            <h4 className="mt-3">{ t('CREATE_CAMPAIGN.age') }</h4>
            {this.state.agesList.map((age) =><AvGroup key={age.id} inline check>
                <Label className="mb-2 mr-4" check>
                  <AvInput name="age" type="checkbox" onChange={(evt) => this.onCheckBoxChange(age.id, 'ages', evt)} />
                  {age.minValue}
                  {age.maxValue !== '+' ? (
                    <span>{' - '}</span>)
                    : null}
                  {age.maxValue}
                </Label>
            </AvGroup>)}
            <div className="divider-select mt-3 mb-3"></div>
            <h4>{ t('CREATE_CAMPAIGN.income') }</h4>
            {this.state.estimatedIncomesList.map((income) =><AvGroup key={income.id} inline check>
                <Label className="mb-2 mr-4" check>
                  <AvInput name="income" type="checkbox" onChange={(evt) => this.onCheckBoxChange(income.id, 'estimatedIncomes', evt)} />
                  {`${income.minValue}$`} {' - '} {`${income.maxValue}$`}
                </Label>
            </AvGroup>)}
            <Col className="p-0 mt-3 mb-3 bg-dark" md={{size: 12}}>
              <p className="title-create">{ t('CREATE_CAMPAIGN.budgetAndProgramming') }</p>
            </Col>
            <AvGroup>
              <AvInput type="number" step=".01" name="budget" id="budget" placeholder={ t('CREATE_CAMPAIGN.budget') } value={this.state.budget} onChange={(evt) => this.setState({budget: evt.target.value})} validate={createCampaignAvForm.budget}/>
              <AvFeedback>{ t('CREATE_CAMPAIGN.invalidName') }</AvFeedback>
            </AvGroup>
            <Row>
              <Col md={{size: 6}}>
                <AvGroup className="mr-sm-3 mb-sm-0" inline>
                  <Label for="startDate">{ t('CREATE_CAMPAIGN.startDate') }</Label>
                  <AvInput onChange={(evt) => this.setState({startDate: evt.target.value})} type="date" name="startDate" id="startDate" placeholder={ t('CREATE_CAMPAIGN.startDate') } validate={createCampaignAvForm.startDate}/>
                </AvGroup>
              </Col>
              <Col md={{size: 6}}>
                <AvGroup className="mr-sm-3 mb-sm-0" inline>
                  <Label for="endDate">{ t('CREATE_CAMPAIGN.endDate') }</Label>
                  <AvInput onChange={(evt) => this.setState({endDate: evt.target.value})} type="date" name="endDate" id="endDate" placeholder={ t('CREATE_CAMPAIGN.endDate') } validate={createCampaignAvForm.endDate}/>
                </AvGroup>
              </Col>
            </Row>
            <div className="divider-select mt-3 mb-3"></div>
            <h4>{ t('CREATE_CAMPAIGN.hourHand') }</h4>
            {this.state.timeFramesList.map((timeFrame) =><AvGroup key={timeFrame.id} inline check>
                <Label className="mb-2 mr-4" check>
                  <AvInput name="timeFrame" type="checkbox" onChange={(evt) => this.onCheckBoxChange(timeFrame.id, 'timeFrames', evt)} />
                  {`${timeFrame.minValue}:00`} {' - '} {`${timeFrame.maxValue}:00`}
                </Label>
            </AvGroup>)}
        </Col>
        <Col md={{size: 4}}>
          <h5 className="mb-3">
            { t('CREATE_CAMPAIGN.name') } {': '} {this.state.name}
          </h5>
          <p>
            { t('CREATE_CAMPAIGN.messageTitle') } {': '} {this.state.messageTitle}
          </p>
          <p>
            { t('CREATE_CAMPAIGN.messageDescription') } {': '} {this.state.messageDescription}
          </p>
            <p>
              { t('CREATE_CAMPAIGN.gender') } {': '} {(this.state.genreId.length > 0) ? (this.state.genresList.filter((element) => element.id === this.state.genreId)
                .map((genre) => (
                  <span key={genre.id}>
                    { t(`CREATE_CAMPAIGN.${genre.name}`) }
                  </span>))
              ) : null}
            </p>
            <p>
              { t('CREATE_CAMPAIGN.age') } {': '}
              {(this.state.ages.length > 0) &&
                this.filterUnChecked('agesList', 'ages')
               .map((age) => <span className="mb-2 mr-2" key={age.id}>
                 [{age.minValue} {' - '} {age.maxValue}]
               </span>)}
            </p>
            <p>
              { t('CREATE_CAMPAIGN.income') } {': '}
              {(this.state.estimatedIncomes.length > 0) &&
                this.filterUnChecked('estimatedIncomesList', 'estimatedIncomes')
               .map((income) => <span className="mb-2 mr-2" key={income.id}>
                 [{`${income.minValue}$`} {' - '} {`${income.maxValue}$`}]
               </span>)}
            </p>
            <p>
              { t('CREATE_CAMPAIGN.budget') } {': '} {this.state.budget}
            </p>
            <p>
              { t('CREATE_CAMPAIGN.startDate') } {': '} {this.state.startDate}
            </p>
            <p>
              { t('CREATE_CAMPAIGN.endDate') } {': '} {this.state.endDate}
            </p>
            <p>
              { t('CREATE_CAMPAIGN.hourHand') } {': '} {(this.state.timeFrames.length > 0) &&
                this.filterUnChecked('timeFramesList', 'timeFrames')
               .map((timeFrame) => <span className="mb-2 mr-2" key={timeFrame.id}>
                 [{`${timeFrame.minValue}:00`} {' - '} {`${timeFrame.maxValue}:00`}]
               </span>)}
            </p>

          <AvGroup>
            <Button className="cancel-left" outline color="danger" type="button" size="sm">
              { t('CREATE_CAMPAIGN.cancel') }
            </Button>
            <Button className="save-draft" outline color="success" type="button" size="sm">
              { t('CREATE_CAMPAIGN.saveDraft') }
            </Button>
          </AvGroup>
          <AvGroup>
            <Button className="mt-3" color="primary" type="submit" size="lg" block>
              { t('CREATE_CAMPAIGN.createCampaign') }
            </Button>
          </AvGroup>

        </Col>
      </Row>
    </AvForm>
  </Container>
</div>)}</I18n>);
  }

  /**
   * handle onCheckBoxChange, calls check or unCheckItem
   * @param  {string} itemId   the id of the item
   * @param  {string} listName 'ages', 'timeFrames', or 'estimatedIncomes'
   * @param  {event} evt the checkbox event
   */
  onCheckBoxChange(itemId, listName, evt) {
    if (evt.target.value === 'false') this.checkItem(itemId, listName);
    if (evt.target.value === 'true') this.unCheckItem(itemId, listName);
  }

  /**
   * Push the the id to the state itemNames's state without duplicates
   * @param  {string} itemId   the id of the item
   * @param  {string} listName 'ages', 'timeFrames', or 'estimatedIncomes'
   */
  checkItem(itemId, listName) {
    let stateCopy = this.state[listName];

    stateCopy.push(itemId);
    stateCopy = [...new Set(stateCopy.map((element) => element.toString()))]

    this.setState({ [listName]: stateCopy });
  }

  /**
   * Filter the id out if the state
   * @param  {string} itemId   the id of the item
   * @param  {string} listName 'ages', 'timeFrames', or 'estimatedIncomes'
   */
  unCheckItem(itemId, listName) {
    let stateCopy = this.state[listName];

    stateCopy = stateCopy.filter((element) => element.toString() !== itemId.toString());

    this.setState({ [listName]: stateCopy });
  }

  /**
   * Filter the unChecked elements from the full list of items
   * @param  {string} checkedListName 'ages', 'timeFrames', or
   * 'estimatedIncomes' (must match states names)
   * @param  {string} listName 'agesList', 'timeFramesList', or
   * 'estimatedIncomesList' (must match states names)
   */
  filterUnChecked(listName, checkedListName) {
    return (this.state[listName].filter((element) => {
      for (const id of this.state[checkedListName]) {
        if (element.id.toString() === id.toString()) return true;
      }

      return false;
    }))
  }

  createCampaign(evt) {
    this.isLoading(true);

    const createCampaignForm = new CreateCampaignForm(
      this.state.name,
      this.state.messageTitle,
      this.state.messageDescription,
      parseInt(this.state.genreId, 10),
      JSON.stringify(this.state.ages.map(Number)),
      JSON.stringify(this.state.estimatedIncomes.map(Number)),
      parseFloat(this.state.budget),
      this.state.startDate,
      this.state.endDate,
      JSON.stringify(this.state.timeFrames.map(Number)),
    );

    CreateCampaignActions.createCampaign(createCampaignForm);
  }

  isLoading(isLoading) {
    this.setState({ loading: isLoading });
  }
}

export default CreateCampaign;
