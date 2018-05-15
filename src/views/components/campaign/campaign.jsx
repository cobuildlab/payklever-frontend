import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class Campaign extends Component {

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
      <Col className=" mt-3 mb-3" md={{size: 4}}>
        <p className="mb-0 title-detail">
          { t('CAMPAIGN_DETAILS.gender') }{': '}
          {(this.props.campaign.genre) ?
            <span className="sub-details">
              {t(`CREATE_CAMPAIGN.${this.props.campaign.genre.name}`)}
            </span>
          : null}
        </p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 4}}>
        <p className="mb-0 title-detail">{t('CAMPAIGN_DETAILS.age') }{': '}
        <TransitionGroup component={null}>
           { (this.props.campaign.ages) && this.props.campaign.ages.map((age) =>
             <CSSTransition key={age.id} timeout={500} classNames="fade-in">
                <span className="sub-details">
                {'['}{age.minValue}
                {age.maxValue !== '+' ? (
                  <span>{' - '}</span>)
                  : null}
                {age.maxValue}{'] '}
                </span>
            </CSSTransition>)}
          </TransitionGroup>
       </p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 4}}>
        <p className="mb-0 title-detail">
          {t('CAMPAIGN_DETAILS.income') }{': '}
          <TransitionGroup component={null}>
             { (this.props.campaign.estimatedIncomes) && this.props.campaign.estimatedIncomes.map((income) =>
               <CSSTransition key={income.id} timeout={500} classNames="fade-in">
                  <span className="sub-details">
                  {'['}{`$${income.minValue}`} {' - '} {`$${income.maxValue}`}{'] '}
                  </span>
              </CSSTransition>)}
            </TransitionGroup>
        </p>
      </Col>
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
             { (this.props.campaign.timeFrames) && this.props.campaign.timeFrames.map((timeFrame) =>
               <CSSTransition key={timeFrame.id} timeout={500} classNames="fade-in">
                  <span className="sub-details">
                  {'['}{`${timeFrame.minValue}:00`} {' - '} {`${timeFrame.maxValue}:00`}{'] '}
                  </span>
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
}

Campaign.propTypes = {
  campaign: PropTypes.object.isRequired,
};

export default Campaign;
