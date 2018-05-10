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
} from 'reactstrap';
import { Avatar } from '../../../assets';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { RingLoader } from 'react-spinners';

class ClientDetails extends Component {

  render() {
    return (<I18n>{(t, { i18n }) => (<div>
      <SubNav backRoute="/admin/campaign-manager/clients" titleI18n="CLIENT_DETAILS.clientDetails"></SubNav>
      <Container>
        <Media className="mt-5">
          <Media left href="#">
            <Media className="App-img-media-item" style={{ backgroundImage: `url(${ Avatar })`}}/>
          </Media>
          <Media body>
            <Media heading>
              Name and LastName
            </Media>
              Email
          </Media>
        </Media>

        <Table className="mt-4">
       <thead className="text-center">
         <tr>
           <th>Accounts</th>
         </tr>
       </thead>
       <tbody>
         <tr>
           <td>
             <Media>
               <Media left href="#">
                 <Media className="App-img-media-item" style={{ backgroundImage: `url(${ Avatar })`}}/>
               </Media>
               <Media body>
                 <Media heading>
                   Accounts Name
                 </Media>
                 Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
               </Media>
             </Media>
           </td>
         </tr>
       </tbody>
     </Table>
      </Container>
    </div>)}</I18n>);
  }

  isLoading = (isLoading) => {
    this.setState({ loading: isLoading });
  }
}
export default ClientDetails;
