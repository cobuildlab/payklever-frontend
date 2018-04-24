import React, { Component } from 'react';
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
  Table,
  Button,
} from 'reactstrap';
import { Link } from "react-router-dom";
import * as PaymentMethodsActions from './payment-methods.actions';

class Accounts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paymentMethods: [{
        id: 1,
        firstName: 'Jose',
        lastName: 'Villalobos',
        cardNumber: '************4564'
      }, {
        id: 2,
        firstName: 'Agustin',
        lastName: 'Vargas',
        cardNumber: '************4879'
      }]
    };
  }

  componentDidMount() {
    PaymentMethodsActions.getPaymentMethods()
      .then((paymentMethods) => {
        this.setState({
          paymentMethods,
        });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (<I18n>{(t, { i18n }) => (
        <Container className="mt-4">
        <Table>
           <tbody>
            { this.state.paymentMethods.map((paymentMethod, index) => <tr key={paymentMethod.id}>
              <td>
                {paymentMethod.firstName} {' '} {paymentMethod.lastName}
              </td>
              <td>
                {paymentMethod.cardNumber}
              </td>
              <td className="text-right">
                <Button color="danger" size="sm">
                  <FontAwesomeIcon icon={faTimes}/>
                </Button>
                 {' '}
                <Button color="primary" size="sm">
                 <FontAwesomeIcon icon={faEdit}/>
                </Button>
              </td>
            </tr> )}
          </tbody>
        </Table>

        <Link to="/client/create-payment">
          <Button className="d-block mx-auto mt-4" color="primary">
          { t('PAYMENT_METHODS.addPayment') }
          </Button>
        </Link>

       </Container>
    )}</I18n>);
  }
}

export default Accounts;
