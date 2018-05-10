import React, { Component } from 'react';
import {
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { i18next } from '../../../i18n';
import { toast } from 'react-toastify';
import { SubNav } from '../../components';
import {
  I18n
} from 'react-i18next';
// import { Clients, Campaigns, Messages } from '../';
import {
  Container,
  Col,
  Row,
  Nav,
  NavLink,
  NavItem,
  Media,
  Table,
  Button,
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { RingLoader } from 'react-spinners';

class CampaignDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      campaign: {
        name: 'Mi primera campaña',
        messageTitle: 'Mi primera campaña',
        messageDescription: 'Descripción de mi primera campaña',
        genre: {
          name: 'male',
        },
        account: {
          name: 'accountName',
          location: 'Account location',
          payment: {
            cardNumber: '#4345'
          },
        },
        ages: [{
          id: 1,
          minValue: '8',
          maxValue: '12'
        }, {
          id: 2,
          minValue: '12',
          maxValue: '20'
        }, ],
        estimatedIncomes: [{
          id: 1,
          minValue: '80',
          maxValue: '100'
        }, {
          id: 2,
          minValue: '100',
          maxValue: '200'
        }, ],
        timeFrames: [{
          id: 1,
          minValue: '8',
          maxValue: '12'
        }, {
          id: 2,
          minValue: '14',
          maxValue: '16'
        }, ],
        budget: '1000',
        startDate: '2018-12-15',
        endDate: '2018-12-30',
      },
    };
  }

  render() {
    return (<I18n>{(t, { i18n }) => (<div>
      <SubNav backRoute="/admin/campaign-manager/" subNavtitle={this.state.campaign.name || ' '}></SubNav>

      <Container className="mt-5">
      <h4>{this.state.campaign.messageTitle}</h4>
      <p >
        {this.state.campaign.messageDescription}
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
          {(this.state.campaign.genre) ?
            <span className="sub-details">
              {t(`CREATE_CAMPAIGN.${this.state.campaign.genre.name}`)}
            </span>
          : null}
        </p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 4}}>
        <p className="mb-0 title-detail">{t('CAMPAIGN_DETAILS.age') }{': '}
        <TransitionGroup component={null}>
           { (this.state.campaign.ages) && this.state.campaign.ages.map((age) =>
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
             { (this.state.campaign.estimatedIncomes) && this.state.campaign.estimatedIncomes.map((income) =>
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
          {(this.state.campaign.budget) ?
            <span className="sub-details">
              {`${this.state.campaign.budget}$`}
            </span>
          : null}
      </p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 4}}>
        <p className="mb-0 title-detail">{ t('CAMPAIGN_DETAILS.startDate')}{': '} <span className="sub-details">{this.state.campaign.startDate}</span></p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 4}}>
        <p className="mb-0 title-detail">{ t('CAMPAIGN_DETAILS.endDate')}{': '} <span className="sub-details">{this.state.campaign.endDate}</span></p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 12}}>
        <p className="mb-0 title-detail">{ t('CAMPAIGN_DETAILS.timeFrame')}{': '}
          <TransitionGroup component={null}>
             { (this.state.campaign.timeFrames) && this.state.campaign.timeFrames.map((timeFrame) =>
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
          {(this.state.campaign.account) ?
            <span className="sub-details">
            {this.state.campaign.account.name}
            </span>
          : null}
        </p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 6}}>
        <p className="mb-0 title-detail">{ t('CAMPAIGN_DETAILS.accountPayment')}{': '}
          {(this.state.campaign.account && this.state.campaign.account.payment) ? <span className="sub-details">
              {this.state.campaign.account.payment.cardNumber}
            </span>
          : null}
        </p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 12}}>
        <p className="mb-0 title-detail">
          { t('CAMPAIGN_DETAILS.accountLocation')}{': '}
          {(this.state.campaign.account) ?
            <span className="sub-details">
              {this.state.campaign.account.location}
            </span>
          : null}
        </p>
      </Col>

      <Col className="mt-5 mb-5 text-center" md={{size: 12}}>
        <Button  className="mr-2" color="danger" type="button" size="sm">
          { t('CAMPAIGN_DETAILS.rejectingCampaign') }
        </Button>
        <Button  className="" color="success" type="button" size="sm">
          { t('CAMPAIGN_DETAILS.approvingCampaign') }
        </Button>
      </Col>



    </Row>
      </Container>
    </div>)}</I18n>);
  }

  isLoading = (isLoading) => {
    this.setState({ loading: isLoading });
  }
}
export default CampaignDetails;
