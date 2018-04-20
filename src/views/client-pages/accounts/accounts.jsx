import React from 'react';
import Flux from '@4geeksacademy/react-flux-dash';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faEdit
} from '@fortawesome/fontawesome-free-solid';
import {
  I18n
} from 'react-i18next';
import {
  Container,
  Col,
  Row,
  Button,
} from 'reactstrap';

class Accounts extends Flux.View {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      accounts: [{
        id: 1,
        name: 'Account1',
        location: 'location1',
        paymentMethod: '****'
      }, {
        id: 2,
        name: 'Account2',
        location: 'location2',
        paymentMethod: '****'
      }]
    };
  }

  render() {
    return (<I18n>{(t, { i18n }) => (
        <Container className="mt-4">
         { this.state.accounts.map((account, index, array) => <div key={account.id}>
          <Row>
           <Col md={{ size: 3, }}>
             {/* TODO: profile img */}
           </Col>
           <Col md={{ size: 6, }}>
               <div>
                 <div>
                   {account.name}
                 </div>
                 <div>
                   {account.location}
                 </div>
                 <div>
                   {account.paymentMethod}
                 </div>
               </div>
           </Col>
           <Col md={{ size: 3, }}>
             <Button color="danger" size="sm">
               <FontAwesomeIcon icon={faTimes}/>
             </Button>
              {' '}
             <Button color="primary" size="sm">
              <FontAwesomeIcon icon={faEdit}/>
             </Button>
           </Col>
         </Row>

         {(array.length - 1 !== index) && (
           <hr />
         )}
         </div>)}

        <Button className="d-block mx-auto mt-4" color="primary" size="sm">
        { t('ACCOUNTS.addAccount') }
        </Button>

       </Container>
    )}</I18n>);
  }
}

export default Accounts;
