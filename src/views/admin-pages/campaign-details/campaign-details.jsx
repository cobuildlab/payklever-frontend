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

  render() {
    return (<I18n>{(t, { i18n }) => (<div>
      <SubNav backRoute="/admin/campaign-manager/" titleI18n="CAMPAIGN_DETAILS.campaignDetails"></SubNav>

      <Container>
      <p className="mt-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id tincidunt nibh, et blandit velit. Cras est sem, porttitor ut maximus vitae, ornare vitae felis. Nulla fringilla ac sem sed consectetur. Nunc dignissim nibh lectus, eu gravida leo facilisis ac. Curabitur purus sem, commodo eu risus vitae, bibendum lacinia neque. Quisque eget nulla at nulla dignissim maximus sit amet et velit. Nulla facilisi.</p>
    <Row>
      <Col className=" mt-3 mb-3 bg-dark" md={{size: 12}}>
        <p className="title-create mb-0">{ t('CAMPAIGN_DETAILS.matchedAudiences') }</p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 3}}>
        <p className="mb-0 title-detail">{ t('CAMPAIGN_DETAILS.accountLocation')}: <span className="sub-details">aqui</span></p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 3}}>
        <p className="mb-0 title-detail">{ t('CAMPAIGN_DETAILS.gender') }: <span className="sub-details">aqui</span></p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 3}}>
        <p className="mb-0 title-detail">{t('CAMPAIGN_DETAILS.age') }: <span className="sub-details">aqui</span></p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 3}}>
        <p className="mb-0 title-detail">{t('CAMPAIGN_DETAILS.income') }: <span className="sub-details">aqui</span></p>
      </Col>

      <Col className=" mt-3 mb-3 bg-dark" md={{size: 12}}>
        <p className="title-create mb-0">{ t('CAMPAIGN_DETAILS.budgetAndProgramming') }</p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 3}}>
        <p className="mb-0 title-detail">{ t('CAMPAIGN_DETAILS.bidPerClick') }: <span className="sub-details">aqui</span></p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 3}}>
        <p className="mb-0 title-detail">{ t('CAMPAIGN_DETAILS.startDate')}: <span className="sub-details">aqui</span></p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 3}}>
        <p className="mb-0 title-detail">{ t('CAMPAIGN_DETAILS.endDate')}: <span className="sub-details">aqui</span></p>
      </Col>

      <Col className=" mt-3 mb-3 bg-dark" md={{size: 12}}>
        <p className="title-create mb-0">{ t('CAMPAIGN_DETAILS.accountPayment') }</p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 12}}>
        <p className="mb-0 title-detail">{ t('CAMPAIGN_DETAILS.accountPayment')}: <span className="sub-details">aqui</span></p>
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
