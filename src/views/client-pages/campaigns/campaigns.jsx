import React from 'react';
import Flux from '@4geeksacademy/react-flux-dash';
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
} from 'reactstrap';
import {
  Link
} from "react-router-dom";
import CampaignsActions from './campaigns.actions';
import { SubNav } from '../../components';

class Campaigns extends Flux.View {
  constructor(props) {
    super(props);

    this.state = {
      campaigns: [{
        id: 1,
        name:  'campaign',
        title: 'title',
      }, {
        id: 2,
        name:  'campaign2',
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
      <SubNav link="/client/create-campaign" linkI18n="CAMPAIGNS.createCampaign" titleI18n="CAMPAIGNS.campaigns"></SubNav>

       <Container className="mt-4">
         <Nav tabs className="nav justify-content-center mt-4">
          <NavItem>
            <NavLink active={true}>
              { t('CAMPAIGNS.campaigns') }
            </NavLink>
          </NavItem>
        </Nav>

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
