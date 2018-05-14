import React, { Component } from 'react';
import {
  SubNav
} from '../../components';
import { CreateCampaignForm } from './create-campaign.classes';
import * as CreateCampaignActions from './create-campaign.actions';
import { createCampaignAvForm, activateCampaignValidator } from './create-campaign.validators';
import { i18next } from '../../../i18n';
import { campaignStore } from '../../../stores';
import { accountStore } from '../../../stores';
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
  Alert,
} from 'reactstrap';
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
  AvRadioGroup,
  AvRadio,
} from 'availity-reactstrap-validation';
import { Link } from "react-router-dom";

class CreateCampaign extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      loadingI18n: '',
      canActivateCamapaign: false,
      campaignId: props.match.params.campaignId || '',
      name: '',
      messageTitle: '',
      messageDescription: '',
      genreId: '',
      genresList: campaignStore.getGenres(),
      ages: [],
      agesList: campaignStore.getAges(),
      timeFrames: [],
      timeFramesList: campaignStore.getTimeFrames(),
      estimatedIncomes: [],
      estimatedIncomesList: campaignStore.getEstimatedIncomes(),
      account: accountStore.getAccount(),
      budget: '',
      startDate: '',
      endDate: '',
    };

    this.checkItem = this.checkItem.bind(this);
    this.unCheckItem = this.unCheckItem.bind(this);
  }

  componentDidMount() {
    this.getCampaignSubscription = campaignStore
      .subscribe('getCampaign', (campaign) => {
        this.setState({
          name: campaign.name || '',
          messageTitle: campaign.messageTitle || '',
          messageDescription: campaign.messageDescription || '',
          genreId: campaign.genreId || '',
          ages: campaign.ages || [],
          timeFrames: campaign.timeFrames || [],
          estimatedIncomes: campaign.estimatedIncomes || [],
          budget: campaign.budget || '',
          startDate: campaign.startDate || '',
          endDate: campaign.endDate || '',
        });

        this.isLoading(false);
        this.canActivateCamapaign(campaign);
      });

    this.createCampaignSubscription = campaignStore
      .subscribe('createCampaign', (campaign) => {
        this.isLoading(false);
        toast.dismiss();
        toast.success(i18next.t('CREATE_CAMPAIGN.campaignSaved'));
        this.setState({ campaignId: campaign.id });
        this.props.history.push(`/client/create-campaign/${campaign.id}`);
        this.canActivateCamapaign(campaign);
      });

    this.updateCampaignSubscription = campaignStore
      .subscribe('updateCampaign', (campaign) => {
        this.isLoading(false);
        toast.dismiss();
        toast.success(i18next.t('CREATE_CAMPAIGN.campaignSaved'));
        this.canActivateCamapaign(campaign);
      });

    this.activateCampaignSubscription = campaignStore
      .subscribe('activateCampaign', (campaign) => {
        this.isLoading(false);
        toast.dismiss();
        toast.success(i18next.t('CREATE_CAMPAIGN.campaignActivated'));
        this.props.history.push(`/client/campaigns`);
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

    this.changeAccountSubscription = accountStore
      .subscribe('changeAccount', (account) => {
        this.setState({ account });
      });

    // if there is a campaignId param get the campaign data from server
    setTimeout(() => {
      if (this.state.campaignId) {
        const campaignId = parseInt(this.state.campaignId, 10);
        this.isLoading(true, 'CREATE_CAMPAIGN.loadingCampaign');
        CreateCampaignActions.getCampaign(campaignId);
      }
    });

    // get campaignStore data
    const campaignState = campaignStore.getState();

    if (Array.isArray(campaignState.getGenres) === false || campaignState.getGenres.length === 0) {
      CreateCampaignActions.getGenres();
    }

    if (Array.isArray(campaignState.getAges) === false || campaignState.getAges.length === 0) {
      CreateCampaignActions.getAges();
    }

    if (Array.isArray(campaignState.getEstimatedIncomes) === false || campaignState.getEstimatedIncomes.length === 0) {
      CreateCampaignActions.getEstimatedIncomes();
    }

    if (Array.isArray(campaignState.getTimeFrames) === false || campaignState.getTimeFrames.length === 0) {
      CreateCampaignActions.getTimeFrames();
    }
  }

  componentWillUnmount() {
    this.getCampaignSubscription.unsubscribe();
    this.createCampaignSubscription.unsubscribe();
    this.updateCampaignSubscription.unsubscribe();
    this.activateCampaignSubscription.unsubscribe();
    this.getGenresSubscription.unsubscribe();
    this.getAgesSubscription.unsubscribe();
    this.getEstimatedIncomesSubscription.unsubscribe();
    this.getTimeframesSubscription.unsubscribe();
    this.campaignStoreError.unsubscribe();
    this.changeAccountSubscription.unsubscribe();
  }

  render() {
    return (<I18n>{(t, { i18n }) => (<div>

    <CSSTransition in={this.state.loading} timeout={500} classNames="fade-in" unmountOnExit>
      <div className="App-overlay">
        <div style={{width: '200px'}} className="App-center-loading">
          <h4 className="text-center">
            { t(this.state.loadingI18n) }
          </h4>
          <RingLoader size={200} color={'#75c044'} loading={true}/>
        </div>
      </div>
    </CSSTransition>

      <SubNav backRoute="/client/campaigns" subNavTitle={t('CREATE_CAMPAIGN.createCampaign')}></SubNav>

      <Container className="mt-4">

        <CSSTransition in={ this.state.canActivateCamapaign } timeout={500} classNames="fade-in" unmountOnExit>
          <Alert className="text-center" color="success">
            { t('CREATE_CAMPAIGN.canActivateCamapaign') }
            <Button className="d-block mx-auto mt-4" color="success" type="button">
                { t('CREATE_CAMPAIGN.activateCampaign') }
            </Button>
          </Alert>
        </CSSTransition>

        <CSSTransition in={ !this.state.account.id } timeout={500} classNames="fade-in" unmountOnExit>
          <Alert className="text-center" color="danger">
            { t('CREATE_CAMPAIGN.noAccount') }

            <Link to="/client/create-account">
              <Button className="d-block mx-auto mt-4" color="danger" type="button">
                { t('CREATE_CAMPAIGN.createAccount') }
              </Button>
            </Link>

          </Alert>
        </CSSTransition>

        <AvForm onValidSubmit={this.handleDraftButton} noValidate>
      <Row className="mb-5 d-flex align-items-stretch">
        <Col className="divider-col" md={{size: 8}}>
            <Col className="p-0 mt-3 mb-3 bg-dark" md={{size: 12}}>
              <p className="title-create">
                { t('CREATE_CAMPAIGN.accountInfo') }
              </p>
            </Col>
            <FormGroup>
              <Input disabled type="text" name="accountName" placeholder={t('CREATE_CAMPAIGN.accountName')} value={this.state.account.name || '' }/>
            </FormGroup>
            <FormGroup>
              <Input disabled type="text" name="accountPayment" placeholder={t('CREATE_CAMPAIGN.accountPayment')} value={(this.state.account.Pay_medium || {}).cardNumber || '' }/>
            </FormGroup>
            <FormGroup>
              <Input disabled type="text" name="accountLocation" placeholder={t('CREATE_CAMPAIGN.accountLocation')} value={this.state.account.location || '' }/>
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
          <FormGroup tag="fieldset">
            <legend>{ t('CREATE_CAMPAIGN.gender') }</legend>
            {this.state.genresList.map((genre) =>
            <FormGroup key={genre.id} check inline>
                <Label check>
                  <Input type="radio" name="genreId" value={genre.id} checked={ (genre.id === this.state.genreId) ? true : false } onChange={(evt) => this.setState({genreId: evt.target.value})}/>{' '}
                  { t(`CREATE_CAMPAIGN.${genre.name}`) }
                </Label>
            </FormGroup>)}
          </FormGroup>
            <h4 className="mt-3">{ t('CREATE_CAMPAIGN.age') }</h4>
            {this.state.agesList.map((age) => {
              const isChecked = this.isChecked(age.id, 'ages');

              return (<AvGroup key={age.id} inline check>
                <Label className="mb-2 mr-4" check>
                  <AvInput checked={isChecked} name="age" type="checkbox" onChange={(evt) => this.onCheckBoxChange(age.id, 'ages', evt)} />
                  {age.minValue}
                  {age.maxValue !== '+' ? (
                    <span>{' - '}</span>)
                    : null}
                  {age.maxValue}
                </Label>
              </AvGroup>)
            })}
            <div className="divider-select mt-3 mb-3"></div>
            <h4>{ t('CREATE_CAMPAIGN.income') }</h4>
            {this.state.estimatedIncomesList.map((income) => {
              const isChecked = this.isChecked(income.id, 'estimatedIncomes');

              return (<AvGroup key={income.id} inline check>
                <Label className="mb-2 mr-4" check>
                  <AvInput checked={isChecked} name="income" type="checkbox" onChange={(evt) => this.onCheckBoxChange(income.id, 'estimatedIncomes', evt)} />
                  {`$${income.minValue}`} {' - '} {`$${income.maxValue}`}
                </Label>
             </AvGroup>)
            })}
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
                  <AvInput value={this.state.startDate} onChange={(evt) => this.setState({startDate: evt.target.value})} type="date" name="startDate" id="startDate" placeholder={ t('CREATE_CAMPAIGN.startDate') } validate={createCampaignAvForm.startDate}/>
                  <AvFeedback>
                    { t('CREATE_CAMPAIGN.invalidStartDate') }
                  </AvFeedback>
                </AvGroup>
              </Col>
              <Col md={{size: 6}}>
                <AvGroup className="mr-sm-3 mb-sm-0" inline>
                  <Label for="endDate">{ t('CREATE_CAMPAIGN.endDate') }</Label>
                  <AvInput value={this.state.endDate} onChange={(evt) => this.setState({endDate: evt.target.value})} type="date" name="endDate" id="endDate" placeholder={ t('CREATE_CAMPAIGN.endDate') } validate={createCampaignAvForm.endDate}/>
                  <AvFeedback>
                    { t('CREATE_CAMPAIGN.invalidEndDate') }
                  </AvFeedback>
                </AvGroup>
              </Col>
            </Row>
            <div className="divider-select mt-3 mb-3"></div>
            <h4>{ t('CREATE_CAMPAIGN.hourHand') }</h4>
            {this.state.timeFramesList.map((timeFrame) => {
              const isChecked = this.isChecked(timeFrame.id, 'timeFrames');

              return (<AvGroup key={timeFrame.id} inline check>
                <Label className="mb-2 mr-4" check>
                  <AvInput checked={isChecked} name="timeFrame" type="checkbox" onChange={(evt) => this.onCheckBoxChange(timeFrame.id, 'timeFrames', evt)} />
                  {`${timeFrame.minValue}:00`} {' - '} {`${timeFrame.maxValue}:00`}
                </Label>
              </AvGroup>)
            })}
        </Col>
        <Col md={{size: 4}}>
          <h5 className="mb-3 title-create-show">
            { t('CREATE_CAMPAIGN.name') } {': '} <span className="subtitle-create-show">{this.state.name}</span>
          </h5>
          <p className="title-create-show">
            { t('CREATE_CAMPAIGN.messageTitle') } {': '} <span className="subtitle-create-show">{this.state.messageTitle}</span>
          </p>
          <p className="title-create-show">
            { t('CREATE_CAMPAIGN.messageDescription') } {': '} <span className="subtitle-create-show">{this.state.messageDescription}</span>
          </p>
            <p className="title-create-show">
              { t('CREATE_CAMPAIGN.gender') } {': '} <span className="subtitle-create-show">{(this.state.genreId.length > 0) ? (this.state.genresList.filter((element) => element.id === this.state.genreId)
                .map((genre) => (
                  <span key={genre.id}>
                    { t(`CREATE_CAMPAIGN.${genre.name}`) }
                  </span>))
              ) : null}</span>
            </p>
            <p className="title-create-show">
              { t('CREATE_CAMPAIGN.age') } {': '}
              <span className="subtitle-create-show">{(this.state.ages.length > 0) &&
                this.filterUnChecked('agesList', 'ages')
               .map((age) => <span className="mb-2 mr-2" key={age.id}>
                 [{age.minValue} {' - '} {age.maxValue}]
               </span>)}</span>
            </p>
            <p className="title-create-show">
              { t('CREATE_CAMPAIGN.income') } {': '}
              <span className="subtitle-create-show">{(this.state.estimatedIncomes.length > 0) &&
                this.filterUnChecked('estimatedIncomesList', 'estimatedIncomes')
               .map((income) => <span className="mb-2 mr-2" key={income.id}>
                 [{`$${income.minValue}`} {' - '} {`$${income.maxValue}`}]
               </span>)}</span>
            </p>
            <p className="title-create-show">
              { t('CREATE_CAMPAIGN.budget') } {': '} <span className="subtitle-create-show">{this.state.budget}</span>
            </p>
            <p className="title-create-show">
              { t('CREATE_CAMPAIGN.startDate') } {': '} <span className="subtitle-create-show">{this.state.startDate}</span>
            </p>
            <p className="title-create-show">
              { t('CREATE_CAMPAIGN.endDate') } {': '} <span className="subtitle-create-show">{this.state.endDate}</span>
            </p>
            <p className="title-create-show">
              { t('CREATE_CAMPAIGN.hourHand') } {': '} <span className="subtitle-create-show">{(this.state.timeFrames.length > 0) &&
                this.filterUnChecked('timeFramesList', 'timeFrames')
               .map((timeFrame) => <span className="mb-2 mr-2" key={timeFrame.id}>
                 [{`${timeFrame.minValue}:00`} {' - '} {`${timeFrame.maxValue}:00`}]
               </span>)}</span>
            </p>

          <AvGroup className="text-center">
            <Link to="/client/campaigns">
            <Button outline color="danger" type="button" size="sm">
              { t('CREATE_CAMPAIGN.cancel') }
            </Button>
            </Link>
            {' '}
            <Button disabled={ !this.state.account.id } outline color="success" type="submit" size="sm">
              { t('CREATE_CAMPAIGN.saveDraft') }
            </Button>
          </AvGroup>

          <CSSTransition in={ this.state.canActivateCamapaign } timeout={500} classNames="fade-in" unmountOnExit>
            <Alert className="text-center" color="success">
              { t('CREATE_CAMPAIGN.canActivateCamapaign') }
              <Button onClick={this.activateCampaign} className="d-block mx-auto mt-4" color="success" type="button">
                  { t('CREATE_CAMPAIGN.activateCampaign') }
              </Button>
            </Alert>
          </CSSTransition>

          <CSSTransition in={ !this.state.account.id } timeout={500} classNames="fade-in" unmountOnExit>
            <Alert className="text-center" color="danger">
              { t('CREATE_CAMPAIGN.noAccount') }

              <Link to="/client/create-account">
                <Button className="d-block mx-auto mt-4" color="danger" type="button">
                  { t('CREATE_CAMPAIGN.createAccount') }
                </Button>
              </Link>

            </Alert>
          </CSSTransition>

        </Col>
      </Row>
    </AvForm>
  </Container>
</div>)}</I18n>);
  }

  /**
   * Check if a ages, estimatedIncomes or timeFrames checkbox is checked
   * @param  {string || number} itemIdToCompare the age, estimatedIncome or
   * timeFrames id to compare
   * @param  {[type]} listName  'ages', 'timeFrames', or 'estimatedIncomes'
   * @return {boolean}   true if the item is checked
   */
  isChecked = (itemIdToCompare, listName) => {
    for (const itemId of this.state[listName]) {
      if (itemId.toString() === itemIdToCompare.toString()) return true;
    }
    return false;
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

    this.setState({
      [listName]: stateCopy
    });
  }

  /**
   * Filter the id out if the state
   * @param  {string} itemId   the id of the item
   * @param  {string} listName 'ages', 'timeFrames', or 'estimatedIncomes'
   */
  unCheckItem(itemId, listName) {
    let stateCopy = this.state[listName];

    stateCopy = stateCopy.filter((element) => element.toString() !== itemId.toString());

    this.setState({
      [listName]: stateCopy
    });
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

  handleDraftButton = () => {
    if (this.state.campaignId) this.updateCampaign();
    else this.createCampaign();
  }

  createCampaign(evt) {
    this.isLoading(true, 'CREATE_CAMPAIGN.savingCampaign');

    const createCampaignForm = new CreateCampaignForm(
      this.state.name,
      this.state.messageTitle || null,
      this.state.messageDescription || null,
      parseInt(this.state.genreId, 10) || null,
      JSON.stringify(this.state.ages.map(Number)),
      JSON.stringify(this.state.estimatedIncomes.map(Number)),
      parseFloat(this.state.budget) || null,
      this.state.startDate || null,
      this.state.endDate || null,
      JSON.stringify(this.state.timeFrames.map(Number)),
      parseInt(this.state.account.id, 10) || null,
    );

    CreateCampaignActions.createCampaign(createCampaignForm);
  }

  updateCampaign() {
    this.isLoading(true, 'CREATE_CAMPAIGN.savingCampaign');

    const campaignId = parseInt(this.state.campaignId, 10);

    const createCampaignForm = new CreateCampaignForm(
      this.state.name,
      this.state.messageTitle || null,
      this.state.messageDescription || null,
      parseInt(this.state.genreId, 10) || null,
      JSON.stringify(this.state.ages.map(Number)),
      JSON.stringify(this.state.estimatedIncomes.map(Number)),
      parseFloat(this.state.budget) || null,
      this.state.startDate || null,
      this.state.endDate || null,
      JSON.stringify(this.state.timeFrames.map(Number)),
      parseInt(this.state.account.id, 10) || null,
    );

    CreateCampaignActions.updateCampaign(createCampaignForm, campaignId);
  }

  canActivateCamapaign = (campaign) => {
    if (campaign.adminStatus !== 're' && campaign.adminStatus !== 'na') {
      toast.dismiss();
      toast.error(i18next.t('CREATE_CAMPAIGN.cannotEdit'));
      this.props.history.push(`/client/campaigns`);
    }

    let campaignId;
    let accountId;
    let paymediaId;

    try {
      campaignId = parseInt(campaign.id, 10);
      accountId = parseInt(campaign.Account.id, 10);
      paymediaId = parseInt(campaign.Account.Pay_medium.id, 10);
    } catch (err) {
      this.setState({ canActivateCamapaign: false });
      return;
    }

    const createCampaignForm = new CreateCampaignForm(
      campaign.name,
      campaign.messageTitle || null,
      campaign.messageDescription || null,
      parseInt(campaign.genreId, 10) || null,
      JSON.stringify((campaign.ages || []).map(Number)),
      JSON.stringify((campaign.estimatedIncomes || []).map(Number)),
      parseFloat(campaign.budget) || null,
      campaign.startDate || null,
      campaign.endDate || null,
      JSON.stringify((campaign.timeFrames || []).map(Number)),
      accountId,
    );

    try {
      activateCampaignValidator(createCampaignForm, paymediaId, campaignId);

      this.setState({ canActivateCamapaign: true });
    } catch (err) {
      this.setState({ canActivateCamapaign: false });
    }
  }

  activateCampaign = () => {
    this.isLoading(true, 'CREATE_CAMPAIGN.activatingCampaign');

    const campaignId = parseInt(this.state.campaignId, 10);

    CreateCampaignActions.activateCampaign(campaignId);
  }

  isLoading = (isLoading, loadingI18n = this.state.loadingI18n) => {
    this.setState({
      loadingI18n,
      loading: isLoading
    });
  }
}

export default CreateCampaign;
