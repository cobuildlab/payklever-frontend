import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import PropTypes from 'prop-types';
import { Col, Row, Badge } from 'reactstrap';
import { i18next } from '../../../i18n';
import { toast } from 'react-toastify';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { campaignStore } from '../../../stores';
import * as CreateCampaignActions from '../../client-pages/create-campaign/create-campaign.actions';

class Campaign extends Component {
  constructor(props) {
    super(props);

    this.state = {
      genresList: campaignStore.getGenres(),
      agesList: campaignStore.getAges(),
      timeFramesList: campaignStore.getTimeFrames(),
      // estimatedIncomesList: campaignStore.getEstimatedIncomes(),
    };
  }

  componentDidMount() {
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
    this.getGenresSubscription.unsubscribe();
    this.getAgesSubscription.unsubscribe();
    // this.getEstimatedIncomesSubscription.unsubscribe();
    this.getTimeframesSubscription.unsubscribe();
  }

  render() {
    return (<I18n>{(t, { i18n }) => (<div>

      <h4>{this.props.campaign.messageTitle}</h4>
      <p >
        {this.props.campaign.messageDescription}
      </p>
    <Row>
      <Col className=" mt-3 mb-3 bg-dark" md={{size: 12}}>
        <p className="title-create mb-0">
          { t('CAMPAIGN_DETAILS.matchedAudiences') }
        </p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 6}}>
        <p className="mb-0 title-detail">
          { t('CAMPAIGN_DETAILS.gender') }{': '}
          {(this.props.campaign.genreId) ? (this.state.genresList.filter((element) => element.id === this.props.campaign.genreId)
            .map((genre) => (
              <span key={genre.id}>
                { t(`CREATE_CAMPAIGN.${genre.name}`) }
              </span>))
          ) : null}
          {(this.props.campaign.genre) ?
            <span className="sub-details">
              {t(`CREATE_CAMPAIGN.${this.props.campaign.genre.name}`)}
            </span>
          : null}
        </p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 6}}>
        <p className="mb-0 title-detail">{t('CAMPAIGN_DETAILS.age') }{': '}
        <TransitionGroup component={null}>
           { (this.props.campaign.ages && this.state.agesList.length) && this.filterUnChecked('agesList', 'ages')
           .map((age) =>
             <CSSTransition key={age.id} timeout={500} classNames="fade-in">
                <Badge color="secondary" className="mr-1 sub-details">
                {age.minValue}
                {age.maxValue !== '+' ? (
                  <span>{' - '}</span>)
                  : null}
                {age.maxValue}
                </Badge>
            </CSSTransition>)}
          </TransitionGroup>
       </p>
      </Col>
      {/* <Col className=" mt-3 mb-3" md={{size: 4}}>
        <p className="mb-0 title-detail">
          {t('CAMPAIGN_DETAILS.income') }{': '}
          <TransitionGroup component={null}>
             { (this.props.campaign.estimatedIncomes && this.state.estimatedIncomesList.length) && this.filterUnChecked('estimatedIncomesList', 'estimatedIncomes')
             .map((income) =>
               <CSSTransition key={income.id} timeout={500} classNames="fade-in">
                  <Badge color="secondary" className="mr-1 sub-details">
                  {`$${income.minValue}`} {' - '} {`$${income.maxValue}`}
                  </Badge>
              </CSSTransition>)}
            </TransitionGroup>
        </p>
      </Col> */}
      <Col className=" mt-3 mb-3 bg-dark" md={{size: 12}}>
        <p className="title-create mb-0">{ t('CAMPAIGN_DETAILS.budgetAndProgramming') }</p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 4}}>
        <p className="mb-0 title-detail">{ t('CAMPAIGN_DETAILS.budget') }{': '}
          {(this.props.campaign.budget) ?
            <span className="sub-details">
              {`$${this.props.campaign.budget}`}
            </span>
          : null}
      </p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 4}}>
        <p className="mb-0 title-detail">{ t('CAMPAIGN_DETAILS.startDate')}{': '} <span className="sub-details">{this.props.campaign.startDate}</span></p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 4}}>
        <p className="mb-0 title-detail">{ t('CAMPAIGN_DETAILS.endDate')}{': '} <span className="sub-details">{this.props.campaign.endDate}</span></p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 12}}>
        <p className="mb-0 title-detail">{ t('CAMPAIGN_DETAILS.timeFrame')}{': '}
          <TransitionGroup component={null}>
             { (this.props.campaign.timeFrames && this.state.timeFramesList.length) && this.filterUnChecked('timeFramesList', 'timeFrames')
             .map((timeFrame) =>
               <CSSTransition key={timeFrame.id} timeout={500} classNames="fade-in">
                  <Badge color="secondary" className="mr-1 sub-details">
                  {`${timeFrame.minValue}:00`} {' - '} {`${timeFrame.maxValue}:00`}
                  </Badge>
              </CSSTransition>)}
            </TransitionGroup>
        </p>
      </Col>

      <Col className=" mt-3 mb-3 bg-dark" md={{size: 12}}>
        <p className="title-create mb-0">
          { t('CAMPAIGN_DETAILS.accountInfo') }
        </p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 6}}>
        <p className="mb-0 title-detail">{ t('CAMPAIGN_DETAILS.accountName')}{': '}
          {(this.props.campaign.Account) ?
            <span className="sub-details">
            {this.props.campaign.Account.name}
            </span>
          : null}
        </p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 6}}>
        <p className="mb-0 title-detail">{ t('CAMPAIGN_DETAILS.accountPayment')}{': '}
          {(this.props.campaign.Account && this.props.campaign.Account.Pay_medium) ? <span className="sub-details">
              {this.props.campaign.Account.Pay_medium.cardNumber}
            </span>
          : null}
        </p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 12}}>
        <p className="mb-0 title-detail">
          { t('CAMPAIGN_DETAILS.accountLocation')}{': '}
          {(this.props.campaign.Account) ?
            <span className="sub-details">
              {this.props.campaign.Account.location}
            </span>
          : null}
        </p>
      </Col>

      <Col className=" mt-3 mb-3 bg-dark" md={{size: 12}}>
        <p className="title-create mb-0">{ t('CAMPAIGN_DETAILS.status') }</p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 6}}>
        <p className="mb-0 title-detail">
          { t('CAMPAIGN_DETAILS.status')}{': '}
          {(this.props.campaign.status) ? <span>
            {t(`CAMPAIGN_USER_STATUS.${this.props.campaign.status}`)}
          </span>
          : null}
        </p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 6}}>
        <p className="mb-0 title-detail">
          { t('CAMPAIGN_DETAILS.adminStatus')}{': '}
          {(this.props.campaign.status) ? <span>
            {t(`CAMPAIGN_ADMIN_STATUS.${this.props.campaign.adminStatus}`)}
          </span>
          : null}
        </p>
      </Col>

    </Row>
    </div>)}</I18n>);
  }

  /**
   * Filter the unChecked elements from the full list of items
   * @param  {string} checkedListName 'ages', 'timeFrames', or
   * 'estimatedIncomes' (must match props names)
   * @param  {string} listName 'agesList', 'timeFramesList', or
   * 'estimatedIncomesList' (must match states names)
   */
  filterUnChecked = (listName, checkedListName) => {
    if(!Array.isArray(this.props.campaign[checkedListName])) return [];

    return (this.state[listName].filter((element) => {
      for (const id of this.props.campaign[checkedListName]) {
        if (element.id.toString() === id.toString()) return true;
      }

      return false;
    }))
  }
}

Campaign.propTypes = {
  campaign: PropTypes.object.isRequired,
};

export default Campaign;
