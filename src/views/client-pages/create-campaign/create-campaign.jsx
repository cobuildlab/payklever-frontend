import React, { Component } from 'react';
import {
  SubNav,
  Loading,
} from '../../components';
import { CreateCampaignForm } from './create-campaign.classes';
import * as CreateCampaignActions from './create-campaign.actions';
import { createCampaignAvForm, activateCampaignValidator } from './create-campaign.validators';
import { i18next } from '../../../i18n';
import { campaignStore } from '../../../stores';
import { accountStore } from '../../../stores';
import { toast } from 'react-toastify';
import { CSSTransition } from 'react-transition-group';
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
  Badge,
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
import moment from 'moment';

class CreateCampaign extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      loadingI18n: '',
      canRequestApproval: false,
      campaignId: props.match.params.campaignId || '',
      name: '',
      link: '',
      messageDescription: '',
      genreId: '',
      genresList: campaignStore.getGenres(),
      ages: [],
      agesList: campaignStore.getAges(),
      timeFrames: [],
      timeFramesList: campaignStore.getTimeFrames(),
      // estimatedIncomes: [],
      // estimatedIncomesList: campaignStore.getEstimatedIncomes(),
      account: accountStore.getAccount(),
      budget: '',
      totalBudget: '',
      smsQuantity: '',
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
          link: campaign.link || '',
          messageDescription: campaign.messageDescription || '',
          genreId: campaign.genreId || '',
          ages: campaign.ages || [],
          timeFrames: campaign.timeFrames || [],
          // estimatedIncomes: campaign.estimatedIncomes || [],
          budget: campaign.budget || '',
          startDate: campaign.startDate || '',
          endDate: campaign.endDate || '',
        });

        this.isLoading(false);
        this.totalBudget();
        this.canRequestApproval(campaign);
      });

    this.createCampaignSubscription = campaignStore
      .subscribe('createCampaign', (campaign) => {
        this.isLoading(false);
        toast.dismiss();
        toast.success(i18next.t('CREATE_CAMPAIGN.campaignSaved'));
        this.setState({ campaignId: campaign.id });
        this.props.history.push(`/client/create-campaign/${campaign.id}`);
        this.canRequestApproval(campaign);
      });

    this.updateCampaignSubscription = campaignStore
      .subscribe('updateCampaign', (campaign) => {
        this.isLoading(false);
        toast.dismiss();
        toast.success(i18next.t('CREATE_CAMPAIGN.campaignSaved'));
        this.canRequestApproval(campaign);
      });

    this.requestApprovalSubscription = campaignStore
      .subscribe('requestApproval', (campaign) => {
        this.isLoading(false);
        toast.dismiss();
        toast.success(i18next.t('CREATE_CAMPAIGN.approvalRequested'));
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

    // this.getEstimatedIncomesSubscription = campaignStore
    //   .subscribe('getEstimatedIncomes', (estimatedIncomesList) => {
    //     this.setState({ estimatedIncomesList });
    //   });

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

    this.calculateSmsSubscription = campaignStore
      .subscribe('calculateSms', (smsQuantity) => {
        this.setState({ smsQuantity });
      });

    this.calculateBudgetSubscription = campaignStore
      .subscribe('calculateBudget', (totalBudget) => {
        this.setState({ totalBudget });
        this.dailyBudget();
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

    // if (Array.isArray(campaignState.getEstimatedIncomes) === false || campaignState.getEstimatedIncomes.length === 0) {
    //   CreateCampaignActions.getEstimatedIncomes();
    // }

    if (Array.isArray(campaignState.getTimeFrames) === false || campaignState.getTimeFrames.length === 0) {
      CreateCampaignActions.getTimeFrames();
    }
  }

  componentWillUnmount() {
    this.getCampaignSubscription.unsubscribe();
    this.createCampaignSubscription.unsubscribe();
    this.updateCampaignSubscription.unsubscribe();
    this.requestApprovalSubscription.unsubscribe();
    this.getGenresSubscription.unsubscribe();
    this.getAgesSubscription.unsubscribe();
    // this.getEstimatedIncomesSubscription.unsubscribe();
    this.getTimeframesSubscription.unsubscribe();
    this.campaignStoreError.unsubscribe();
    this.changeAccountSubscription.unsubscribe();
    this.calculateSmsSubscription.unsubscribe();
    this.calculateBudgetSubscription.unsubscribe();
  }

  render() {
    return (<I18n>{(t, { i18n }) => (<div>

    <Loading isLoading={this.state.loading} loadingMessage={ t(this.state.loadingI18n) }></Loading>

      <SubNav backRoute="/client/campaigns" subNavTitle={this.props.match.params.campaignId ? t('CREATE_CAMPAIGN.editCampaign') : t('CREATE_CAMPAIGN.createCampaign')}></SubNav>

      <Container className="mt-4">

        <CSSTransition in={ this.state.canRequestApproval } timeout={500} classNames="fade-in" unmountOnExit>
          <Alert className="text-center" color="success">
            { t('CREATE_CAMPAIGN.canRequestApproval') }
            <Button onClick={this.requestApproval} className="d-block mx-auto mt-4" color="success" type="button">
                { t('CREATE_CAMPAIGN.requestApproval') }
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
              <Input invalid={!this.state.account.Pay_medium} disabled type="text" name="accountPayment" placeholder={t('CREATE_CAMPAIGN.paymentRequired')} value={(this.state.account.Pay_medium) ? t('APP.cardMask', { cardNumber: this.state.account.Pay_medium.cardNumber }) : '' }/>
              {(!this.state.account.Pay_medium) ?
               <FormText color="danger">
                  {t('CREATE_CAMPAIGN.mustHavePayment')}
               </FormText>
              : null }
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
              <AvInput type="text" name="link" id="link" placeholder={ t('CREATE_CAMPAIGN.link') } value={this.state.link} onChange={(evt) => this.setState({link: evt.target.value})} validate={createCampaignAvForm.link}/>
              <AvFeedback>{ t('CREATE_CAMPAIGN.invalidLink') }</AvFeedback>
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
            <div className="divider-select mt-3 mb-3"></div>
            <h4 className="mt-3">
              { t('CREATE_CAMPAIGN.age') }
            </h4>
            {this.state.agesList.map((age, index) => {
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
                {(index === this.state.agesList.length - 1) ?
                  <span>
                  {(this.state.agesList.length && (this.state.agesList.length === this.state.ages.length)) ?
                    <Label className="mb-2 mr-4" check>
                      <AvInput checked={true} name="age" type="checkbox" onChange={() => {this.unSelectAll('ages')}} />
                      { t('CREATE_CAMPAIGN.unSelectAll')}
                    </Label> :
                    <Label className="mb-2 mr-4" check>
                      <AvInput checked={false} name="age" type="checkbox" onChange={() => {this.selectAll('agesList', 'ages')}} />
                      { t('CREATE_CAMPAIGN.selectAll')}
                    </Label> }
                  </span>
                : null }
              </AvGroup>)
            })}
            {/* <div className="divider-select mt-3 mb-3"></div>
            <h4>
              { t('CREATE_CAMPAIGN.income') }
            </h4>
            {this.state.estimatedIncomesList.map((income) => {
              const isChecked = this.isChecked(income.id, 'estimatedIncomes');

              return (<AvGroup key={income.id} inline check>
                <Label className="mb-2 mr-4" check>
                  <AvInput checked={isChecked} name="income" type="checkbox" onChange={(evt) => this.onCheckBoxChange(income.id, 'estimatedIncomes', evt)} />
                  {`$${income.minValue}`} {' - '} {`$${income.maxValue}`}
                </Label>
                {(index === this.state.estimatedIncomesList.length - 1) ?
                  <span>
                  {(this.state.estimatedIncomesList.length && (this.state.estimatedIncomesList.length === this.state.estimatedIncomes.length)) ?
                    <Label className="mb-2 mr-4" check>
                      <AvInput checked={true} name="income" type="checkbox" onChange={() => {this.unSelectAll('estimatedIncomes')}} />
                      { t('CREATE_CAMPAIGN.unSelectAll')}
                    </Label> :
                    <Label className="mb-2 mr-4" check>
                      <AvInput checked={false} name="income" type="checkbox" onChange={() => {this.selectAll('estimatedIncomesList', 'estimatedIncomes')}} />
                      { t('CREATE_CAMPAIGN.selectAll')}
                    </Label> }
                  </span>
                : null }
             </AvGroup>)
            })} */}
            <Col className="p-0 mt-3 mb-3 bg-dark" md={{size: 12}}>
              <p className="title-create">{ t('CREATE_CAMPAIGN.budgetAndProgramming') }</p>
            </Col>
            <Row>
              <Col md={{size: 6}}>
                <AvGroup>
                  <Label for="budget">
                    { t('CREATE_CAMPAIGN.budget') }
                  </Label>
                  <AvInput type="number" name="budget" id="budget" placeholder={ t('CREATE_CAMPAIGN.budget') } value={this.state.budget} onChange={(evt) => this.onBudgetChange(evt.target.value)} validate={createCampaignAvForm.budget}/>
                  <AvFeedback>
                    { t('CREATE_CAMPAIGN.invalidBudget') }
                  </AvFeedback>
                </AvGroup>
              </Col>
              <Col md={{size: 6}}>
                <AvGroup>
                  <Label for="smsQuantity">
                    { t('CREATE_CAMPAIGN.smsQuantity') }
                  </Label>
                  <AvInput type="number" name="smsQuantity" id="smsQuantity" placeholder={ t('CREATE_CAMPAIGN.smsQuantity') } value={this.state.smsQuantity} onChange={(evt) => this.onSmsQuantityChange(evt.target.value)} validate={createCampaignAvForm.smsQuantity}/>
                  <AvFeedback>{ t('CREATE_CAMPAIGN.invalidSmsQuantity') }</AvFeedback>
                </AvGroup>
              </Col>
            </Row>
            <Row>
              <Col md={{size: 6}}>
                <AvGroup className="mr-sm-3 mb-sm-0" inline>
                  <Label for="startDate">{ t('CREATE_CAMPAIGN.startDate') }</Label>
                  <AvInput value={this.state.startDate} onChange={(evt) => this.onStartDateChange(evt.target.value)} type="date" name="startDate" id="startDate" placeholder={ t('CREATE_CAMPAIGN.startDate') } validate={createCampaignAvForm.startDate}/>
                  <AvFeedback>
                    { t('CREATE_CAMPAIGN.invalidStartDate') }
                  </AvFeedback>
                </AvGroup>
              </Col>
              <Col md={{size: 6}}>
                <AvGroup className="mr-sm-3 mb-sm-0" inline>
                  <Label for="endDate">{ t('CREATE_CAMPAIGN.endDate') }</Label>
                  <AvInput value={this.state.endDate} onChange={(evt) => this.onEndDateChange(evt.target.value)} type="date" name="endDate" id="endDate" placeholder={ t('CREATE_CAMPAIGN.endDate') } validate={createCampaignAvForm.endDate}/>
                  <AvFeedback>
                    { t('CREATE_CAMPAIGN.invalidEndDate') }
                  </AvFeedback>
                </AvGroup>
              </Col>
            </Row>
            <div className="divider-select mt-3 mb-3"></div>
            <h4>
              { t('CREATE_CAMPAIGN.hourHand') }
            </h4>
            {this.state.timeFramesList.map((timeFrame, index) => {
              const isChecked = this.isChecked(timeFrame.id, 'timeFrames');

              return (<AvGroup key={timeFrame.id} inline check>
                <Label className="mb-2 mr-4" check>
                  <AvInput checked={isChecked} name="timeFrame" type="checkbox" onChange={(evt) => this.onCheckBoxChange(timeFrame.id, 'timeFrames', evt)} />
                  {`${timeFrame.minValue}:00`} {' - '} {`${timeFrame.maxValue}:00`}
                </Label>
                {(index === this.state.timeFramesList.length - 1) ?
                  <span>
                  {(this.state.timeFramesList.length && (this.state.timeFramesList.length === this.state.timeFrames.length)) ?
                    <Label className="mb-2 mr-4" check>
                      <AvInput checked={true} name="timeFrame" type="checkbox" onChange={() => {this.unSelectAll('timeFrames')}} />
                      { t('CREATE_CAMPAIGN.unSelectAll')}
                    </Label> :
                    <Label className="mb-2 mr-4" check>
                      <AvInput checked={false} name="timeFrame" type="checkbox" onChange={() => {this.selectAll('timeFramesList', 'timeFrames')}} />
                      { t('CREATE_CAMPAIGN.selectAll')}
                    </Label> }
                  </span>
                : null }
              </AvGroup>)
            })}
        </Col>
        <Col md={{size: 4}}>
          <p className="mb-3 title-create-show">
            { t('CREATE_CAMPAIGN.name') } {': '} <span className="subtitle-create-show">{this.state.name}</span>
        </p>
          <p className="title-create-show">
            { t('CREATE_CAMPAIGN.link') } {': '} <span className="subtitle-create-show">{this.state.link}</span>
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
               .map((age) => <Badge color="secondary" className="mb-2 mr-2" key={age.id}>
                 {age.minValue} {' - '} {age.maxValue}
               </Badge>)}</span>
            </p>
            {/* <p className="title-create-show">
              { t('CREATE_CAMPAIGN.income') } {': '}
              <span className="subtitle-create-show">{(this.state.estimatedIncomes.length > 0) &&
                this.filterUnChecked('estimatedIncomesList', 'estimatedIncomes')
                .map((income) => <Badge color="secondary" className="mb-2 mr-2" key={income.id}>
                 {`$${income.minValue}`} {' - '} {`$${income.maxValue}`}
               </Badge>)}</span>
            </p> */}
            <p className="title-create-show">
              { t('CREATE_CAMPAIGN.budget') } {': '} <span className="subtitle-create-show">{this.state.budget}</span>
            </p>
            <p className="title-create-show">
              { t('CREATE_CAMPAIGN.totalBudget') } {': '} <span className="subtitle-create-show">{this.state.totalBudget}</span>
            </p>
            <p className="title-create-show">
              { t('CREATE_CAMPAIGN.smsQuantity') } {': '} <span className="subtitle-create-show">{this.state.smsQuantity}</span>
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
               .map((timeFrame) => <Badge color="secondary" className="mb-2 mr-2" key={timeFrame.id}>
                 {`${timeFrame.minValue}:00`} {' - '} {`${timeFrame.maxValue}:00`}
               </Badge>)}</span>
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

          <CSSTransition in={ this.state.canRequestApproval } timeout={500} classNames="fade-in" unmountOnExit>
            <Alert className="text-center" color="success">
              { t('CREATE_CAMPAIGN.canRequestApproval') }
              <Button onClick={this.requestApproval} className="d-block mx-auto mt-4" color="success" type="button">
                  { t('CREATE_CAMPAIGN.requestApproval') }
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

  onBudgetChange = debounce(budget => {
    this.setState({ budget });
    this.totalBudget();
  }, 400);

  onStartDateChange = debounce(startDate => {
    this.setState({ startDate });
    if (this.state.budget) {
      return this.totalBudget();
    }

    this.calculateBudget();
  }, 400);

  onEndDateChange = debounce(endDate => {
    this.setState({ endDate });
    if (this.state.budget) {
      return this.totalBudget();
    }

    this.calculateBudget();
  }, 400);

  onSmsQuantityChange = debounce(smsQuantity => {
    this.setState({ smsQuantity });
    this.calculateBudget();
  }, 400);

  /**
   * Sets the totalBudget to the state (budget * campaignDays)
   * then it calls the calculateSms method
   */
  totalBudget = () => {
    if (!moment(this.state.startDate).isValid() || !moment(this.state.endDate).isValid() ||
      !this.state.budget) {
      return this.setState({ totalBudget: '' });
    }

    const date1 = moment(this.state.startDate);
    const date2 = moment(this.state.endDate);
    const campaignDays = date2.diff(date1, 'days') + 1;

    if (campaignDays <= 0) {
      return this.setState({ totalBudget: '' });
    }

    const totalBudget = campaignDays * this.state.budget;

    this.setState({ totalBudget });

    this.calculateSms();
  }

  /**
   * Sets the dailyBudget to the state (totalBudget / campaignDays)
   *
   */
  dailyBudget = () => {
    if (!moment(this.state.startDate).isValid() || !moment(this.state.endDate).isValid() ||
      !this.state.totalBudget) {
      return this.setState({ budget: '' });
    }

    const date1 = moment(this.state.startDate);
    const date2 = moment(this.state.endDate);
    const campaignDays = date2.diff(date1, 'days') + 1;

    if (campaignDays <= 0) {
      return this.setState({ budget: '' });
    }

    const budget = this.state.totalBudget / campaignDays;

    this.setState({ budget });
  }

  calculateSms = () => {
    if (!this.state.totalBudget) return;

    CreateCampaignActions.calculateSms(this.state.totalBudget);
  }

  calculateBudget = () => {
    if (!this.state.smsQuantity) return;

    CreateCampaignActions.calculateBudget(this.state.smsQuantity);
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
   * select all checkbox items
   * @param  {string} selectListName  the list to select 'ages', 'timeFrames',
   *  or 'estimatedIncomes'
   * @param  {string} listName 'agesList', 'timeFramesList', or
   *  'estimatedIncomesList'
   */
  selectAll = (listName, selectListName) => {
    this.setState({
      [selectListName]: this.state[listName].map((item) => item.id),
    });
  }

  /**
   * unSelect all checkbox items
   * @param  {string} unSelectListName  the list to select 'ages', 'timeFrames',
   *  or 'estimatedIncomes'
   */
  unSelectAll = (unSelectListName) => {
    this.setState({
      [unSelectListName]: [],
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
      this.state.link || null,
      this.state.messageDescription || null,
      parseInt(this.state.genreId, 10) || null,
      JSON.stringify(this.state.ages.map(Number)),
      // JSON.stringify(this.state.estimatedIncomes.map(Number)),
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
      this.state.link || null,
      this.state.messageDescription || null,
      parseInt(this.state.genreId, 10) || null,
      JSON.stringify(this.state.ages.map(Number)),
      // JSON.stringify(this.state.estimatedIncomes.map(Number)),
      parseFloat(this.state.budget) || null,
      this.state.startDate || null,
      this.state.endDate || null,
      JSON.stringify(this.state.timeFrames.map(Number)),
      parseInt(this.state.account.id, 10) || null,
    );

    CreateCampaignActions.updateCampaign(createCampaignForm, campaignId);
  }

  canRequestApproval = (campaign) => {
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
      this.setState({ canRequestApproval: false });
      return;
    }

    const createCampaignForm = new CreateCampaignForm(
      campaign.name,
      campaign.link || null,
      campaign.messageDescription || null,
      parseInt(campaign.genreId, 10) || null,
      JSON.stringify((campaign.ages || []).map(Number)),
      // JSON.stringify((campaign.estimatedIncomes || []).map(Number)),
      parseFloat(campaign.budget) || null,
      campaign.startDate || null,
      campaign.endDate || null,
      JSON.stringify((campaign.timeFrames || []).map(Number)),
      accountId,
    );

    try {
      activateCampaignValidator(createCampaignForm, paymediaId, campaignId);

      this.setState({ canRequestApproval: true });
    } catch (err) {
      this.setState({ canRequestApproval: false });
    }
  }

  requestApproval = () => {
    this.isLoading(true, 'CREATE_CAMPAIGN.requestingApproval');

    const campaignId = parseInt(this.state.campaignId, 10);

    CreateCampaignActions.requestApproval(campaignId);
  }

  isLoading = (isLoading, loadingI18n = this.state.loadingI18n) => {
    this.setState({
      loadingI18n,
      loading: isLoading
    });
  }
}


/*
to set input onChange delay
 */
function debounce(a, b, c) {
  var d, e;
  return function() {
    function h() { d = null, c || (e = a.apply(f, g)) }
    var f = this,
      g = arguments;
    return clearTimeout(d), d = setTimeout(h, b), c && !d && (e = a.apply(f, g)), e
  }
}

export default CreateCampaign;
