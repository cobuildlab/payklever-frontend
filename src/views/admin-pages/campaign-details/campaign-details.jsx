import React, { Component } from 'react';
import {
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { i18next } from '../../../i18n';
import { toast } from 'react-toastify';
import { SubNav, Campaign } from '../../components';
import {
  I18n
} from 'react-i18next';
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

class CampaignDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      campaign: {
        status: 'ia',
        adminStatus: 'wa',
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
      <SubNav backRoute="/admin/campaign-manager/" subNavTitle={this.state.campaign.name || ' '}></SubNav>

      <Container className="mt-5">

      <Campaign campaign={this.state.campaign}></Campaign>

      <Col className="mt-5 mb-5 text-center" md={{size: 12}}>
        <Button  className="mr-2" color="danger" type="button" size="sm">
          { t('CAMPAIGN_DETAILS.rejectingCampaign') }
        </Button>
        <Button  className="" color="success" type="button" size="sm">
          { t('CAMPAIGN_DETAILS.approvingCampaign') }
        </Button>
      </Col>

      </Container>
    </div>)}</I18n>);
  }

  isLoading = (isLoading) => {
    this.setState({ loading: isLoading });
  }
}
export default CampaignDetails;
