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
      paymentMethods: [{
        id: 1,
        firstname: 'Jose',
        lastname: 'Villalobos',
        card: '****'
      }, {
        id: 2,
        firstname: 'Agustin',
        lastname: 'Vargas',
        card: '****'
      }]
    };
  }

  render() {
    return (<I18n>{(t, { i18n }) => (
        <Container className="mt-4">
         { this.state.paymentMethods.map((paymentMethod, index, array) => <div key={paymentMethod.id}>
          <Row>
           <Col md={{ size: 3, }}>
             {/* TODO: profile img */}
           </Col>
           <Col md={{ size: 6, }}>
               <div>
                 <div>
                   {paymentMethod.firstname}
                 </div>
                 <div>
                   {paymentMethod.lastname}
                 </div>
                 <div>
                   {paymentMethod.card}
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
         { t('PAYMENT_METHODS.addPayment') }
         </Button>

       </Container>
    )}</I18n>);
  }
}

export default Accounts;
