import React, { Component } from 'react';
import {
  I18n
} from 'react-i18next';
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
import * as CampaignsActions from './campaigns.actions';
import { SubNav } from '../../components';

class Campaigns extends Component {
  constructor(props) {
    super(props);

    this.state = {
      campaigns: [{
        id: 1,
        name: 'campaign',
        title: 'title',
      }, {
        id: 2,
        name: 'campaign2',
        title: 'title2',
      }],
    };
  }

  componentDidMount() {
    CampaignsActions.getCampaigns()
      .then((campaigns) => {
        this.setState({
          campaigns,
        });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (<I18n>{(t, { i18n }) => (
      <div>
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
          <Link to="/client/create-campaign">
            <Button color="primary">Create Campaigns</Button>
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
          <h1 className="text-center mb-4">Campaigns</h1>
         <Table>
            <thead>
              <tr>
                <th>{ t('CAMPAIGNS.name') }</th>
                <th>{ t('CAMPAIGNS.title') }</th>
              </tr>
            </thead>
            <tbody>
             { this.state.campaigns.map((campaign) =>
             <tr key={campaign.id}>
               <td>{campaign.name}</td>
               <td>{campaign.title}</td>
             </tr> )}
           </tbody>
         </Table>
       </Container>
      </div>
    )}</I18n>);
  }
}

export default Campaigns;
