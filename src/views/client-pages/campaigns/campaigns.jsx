import React, { Component } from 'react';
import {
  I18n
} from 'react-i18next';
import { i18next } from '../../../i18n';
import { toast } from 'react-toastify';
import {
  Container,
  Table,
  Button,
  Nav,
  NavItem,
  NavLink,
  Col,
  Row,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  InputGroup,
  InputGroupAddon,
  Input,
} from 'reactstrap';
import {
  Link
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { RingLoader } from 'react-spinners';
import * as CampaignsActions from './campaigns.actions';
import { campaignStore } from '../../../stores';
import { SubNav } from '../../components';

class Campaigns extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      campaigns: [],
    };

    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.getCampaignsSubscription = campaignStore
      .subscribe('getCampaigns', (campaigns) => {
        this.setState({ campaigns });
        this.isLoading(false);
      });

    this.campaignStoreError = campaignStore
      .subscribe('CampaignStoreError', (err) => {
        this.isLoading(false);
        toast.dismiss();
        toast.error(err.message || i18next.t('FETCH.error'));
      });

      CampaignsActions.getCampaigns();
  }

  componentWillUnmount() {
    this.getCampaignsSubscription.unsubscribe();
    this.campaignStoreError.unsubscribe();
  }

  render() {
    return (<I18n>{(t, { i18n }) => (
      <div>

      <CSSTransition in={this.state.loading} timeout={500} classNames="fade-in" unmountOnExit>
        <div className="App-overlay">
          <div style={{width: '200px'}} className="App-center-loading">
            <h4 className="text-center">
                { t('CAMPAIGNS.loadingCampaigns') }
            </h4>
            <RingLoader size={200} color={'#75c044'} loading={true}/>
          </div>
        </div>
      </CSSTransition>

       <Container className="mt-4 p-0">
         <Nav className="nav mt-5 mb-3 p-0 d-flex justify-content-end">
          <NavItem>
            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </NavItem>
          <NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </NavItem>
          <NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Options
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                Option 1
              </DropdownItem>
              <DropdownItem>
                Option 2
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                Reset
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          </NavItem>
          <InputGroup>
           <Input/>
           <InputGroupAddon addonType="append">
             <Button color="secondary">S</Button>
           </InputGroupAddon>
         </InputGroup> */}
          <Link to="/client/create-campaign/">
            <Button color="primary">{ t('CAMPAIGNS.createCampaign') }</Button>
          </Link>
        </NavItem>
        </Nav>
        {/* <Row className="cant-data mb-5 d-flex justify-content-center">
          <Col md={{size: 2,}}>
            <p className="text-center mb-0">Conversion</p>
            <h1 className="text-center">99</h1>
          </Col>
          <Col md={{size: 2,}}>
            <p className="text-center mb-0">Lead</p>
            <h1 className="text-center">99</h1>
          </Col>
          <Col md={{size: 2,}}>
            <p className="text-center mb-0">Impressions</p>
            <h1 className="text-center">99</h1>
          </Col>
          <Col md={{size: 2,}}>
            <p className="text-center mb-0">Click</p>
            <h1 className="text-center">99</h1>
          </Col>
          <Col md={{size: 2,}}>
            <p className="text-center mb-0">Total Spend</p>
            <h1 className="text-center">99</h1>
          </Col>
        </Row> */}
          <h1 className="text-center mb-4">{ t('CAMPAIGNS.campaigns') }</h1>
         <Table>
            <thead>
              <tr>
                <th>{ t('CAMPAIGNS.name') }</th>
                <th>{ t('CAMPAIGNS.title') }</th>
                <th>{ t('CAMPAIGNS.status') }</th>
                <th>{ t('CAMPAIGNS.adminStatus') }</th>
              </tr>
            </thead>
            <tbody>
            <TransitionGroup component={null}>
             { this.state.campaigns.map((campaign) =>
               <CSSTransition key={campaign.id} timeout={500} classNames="fade-in">
                 <tr>
                   <td>{campaign.name}</td>
                   <td>{campaign.messageTitle}</td>
                   <td>{t(`CAMPAIGN_USER_STATUS.${campaign.status}`)}</td>
                   <td>{t(`CAMPAIGN_ADMIN_STATUS.${campaign.adminStatus}`)}</td>
                 </tr>
               </CSSTransition>)}
            </TransitionGroup>
           </tbody>
         </Table>
       </Container>
      </div>
    )}</I18n>);
  }

  isLoading(isLoading) {
    this.setState({ loading: isLoading });
  }
}

export default Campaigns;
