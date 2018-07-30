import React, { Component } from 'react';
import {
  I18n
} from 'react-i18next';
import { i18next } from '../../../i18n';
import { toast } from 'react-toastify';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTimes, faEdit } from '@fortawesome/fontawesome-free-solid';
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
  Form,
  FormGroup,
} from 'reactstrap';
import {
  Link
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import * as CampaignsActions from './campaigns.actions';
import { campaignStore, accountStore } from '../../../stores';
import { Loading, LineChart, PaginationComponent } from '../../components';

class Campaigns extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      loadingI18n: '',
      campaigns: {},
      chartData: {},
      days: 7,
      daysList: [7, 30, 90],
    };
  }

  componentDidMount() {
    this.getCampaignsSubscription = campaignStore
      .subscribe('getCampaigns', (campaigns) => {
        this.setState({ campaigns });
        this.isLoading(false);
      });

    this.getAccountStatisticsSubscription = campaignStore
      .subscribe('getAccountStatistics', (chartData) => {
        this.setState({ chartData });
        this.isLoading(false);
      });

    this.changeAccountSubscription = accountStore
      .subscribe('changeAccount', (account) => {
        this.isLoading(true, 'CAMPAIGNS.loadingCampaigns');
        CampaignsActions.getCampaigns(account.id, 0);
        CampaignsActions.getAccountStatistics(account.id, this.state.days);
      });

    this.campaignStoreError = campaignStore
      .subscribe('CampaignStoreError', (err) => {
        this.isLoading(false);
        toast.dismiss();
        toast.error(err.message || i18next.t('FETCH.error'));
      });

    const account = accountStore.getAccount();
    if (account.id) {
      this.isLoading(true, 'CAMPAIGNS.loadingCampaigns');
      CampaignsActions.getCampaigns(account.id, 0);
      CampaignsActions.getAccountStatistics(account.id, this.state.days);
    }
  }

  componentWillUnmount() {
    this.getCampaignsSubscription.unsubscribe();
    this.getAccountStatisticsSubscription.unsubscribe();
    this.changeAccountSubscription.unsubscribe();
    this.campaignStoreError.unsubscribe();
  }

  render() {
    return (<I18n>{(t, { i18n }) => (
      <div>

      <Loading isLoading={this.state.loading} loadingMessage={ t(this.state.loadingI18n) }></Loading>

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

        <Form className="mt-3" inline hidden={!Array.isArray(this.state.chartData.datasets)}>
          <FormGroup>
            <Input onChange={(evt) => this.onDaysChange(evt)} value={this.state.days} type="select" name="days">
              {this.state.daysList.map((day, index) =>
                <option key={index} value={day}>
                  { t('STATISTICS.lastCountDays', { days: day }) }
                </option>
              )}
            </Input>
          </FormGroup>
        </Form>
        <LineChart data={this.state.chartData}></LineChart>

          <h1 className="text-center mt-4 mb-4">{ t('CAMPAIGNS.campaigns') }</h1>
         <Table>
            <thead>
              <tr>
                <th>{ t('CAMPAIGNS.name') }</th>
                <th>{ t('CAMPAIGNS.link') }</th>
                <th>{ t('CAMPAIGNS.status') }</th>
                <th>{ t('CAMPAIGNS.adminStatus') }</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            <TransitionGroup component={null}>
             { (this.state.campaigns.rows && this.state.campaigns.rows.length) ? this.state.campaigns.rows.map((campaign) =>
               <CSSTransition key={campaign.id} timeout={500} classNames="fade-in-change">
                 <tr>
                   <td>
                     <Link to={`/client/campaign-details/${campaign.id}`}>
                        {campaign.name}
                     </Link>
                   </td>
                   <td>{campaign.link}</td>
                   <td>{t(`CAMPAIGN_USER_STATUS.${campaign.status}`)}</td>
                   <td>{t(`CAMPAIGN_ADMIN_STATUS.${campaign.adminStatus}`)}</td>
                   <td className="text-right">
                     {(campaign.adminStatus === 'na' ||
                      campaign.adminStatus === 're') ? (
                      <Link to={`/client/create-campaign/${campaign.id}`}>
                        <Button title={t('CAMPAIGNS.editCampaign')} color="primary" size="sm">
                        <FontAwesomeIcon icon={faEdit}/>
                        </Button>
                      </Link>
                     ) : null}
                   </td>
                 </tr>
               </CSSTransition>)
             : null }
            </TransitionGroup>
           </tbody>
         </Table>

         <PaginationComponent pages={this.state.campaigns.pages} page={this.state.campaigns.page} onPageChange={this.reloadCampaigns}></PaginationComponent>

       </Container>
      </div>
    )}</I18n>);
  }

  reloadCampaigns = (page) => {
    const account = accountStore.getAccount();
    if (account.id) {
      this.isLoading(true, 'CAMPAIGNS.loadingCampaigns');
      CampaignsActions.getCampaigns(account.id, page);
    }
  }

  onDaysChange = (evt) => {
    this.setState({ days: evt.target.value });
    this.reloadStats(evt.target.value);
  }

  reloadStats = (days) => {
    const account = accountStore.getAccount();
    if (account.id) {
      this.isLoading(true, 'STATISTICS.loadingStatistics');
      CampaignsActions.getAccountStatistics(account.id, days);
    }
  }

  isLoading = (isLoading, loadingI18n = this.state.loadingI18n) => {
    this.setState({
      loadingI18n,
      loading: isLoading
    });
  }
}

export default Campaigns;
