import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';

class Invoice extends Component {

  render() {
    return (<I18n>{(t, { i18n }) => (<div>

    <Row>
      <Col className=" mt-3 mb-3 bg-dark" md={{size: 12}}>
        <p className="title-create mb-0">
          { t('INVOICE_DETAILS.campaignInfo') }
        </p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 12}}>
        <p className="mb-0 title-detail">
          { t('CLIENT_CAMPAIGNS.campaignName') }{': '}
          {(this.props.invoice.Campaign && this.props.invoice.Campaign.name) ?
              <span className="sub-details">
                {this.props.invoice.Campaign.name}
              </span>
          : null}
        </p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 12}}>
        <p className="mb-0 title-detail">
          { t('CAMPAIGN_DETAILS.accountName') }{': '}
          {(this.props.invoice.Campaign && this.props.invoice.Campaign.Account && this.props.invoice.Campaign.Account.name) ?
              <span className="sub-details">
                {this.props.invoice.Campaign.Account.name}
              </span>
          : null}
        </p>
      </Col>

      <Col className=" mt-3 mb-3 bg-dark" md={{size: 12}}>
        <p className="title-create mb-0">
          { t('INVOICE_DETAILS.smsInfo') }
        </p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 4}}>
        <p className="mb-0 title-detail">{t('INVOICES.smsSent') }{': '}
          { (this.props.invoice.smsSent) ?
            <span className="sub-details">
              {`${this.props.invoice.smsSent}`}
            </span>
          : null }
       </p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 4}}>
        <p className="mb-0 title-detail">{t('INVOICES.smsPrice') }{': '}
          { (this.props.invoice.smsPrice) ?
            <span className="sub-details">
              {`$${this.props.invoice.smsPrice}`}
            </span>
          : null }
       </p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 4}}>
        <p className="mb-0 title-detail">{t('INVOICES.tax') }{': '}
          { (this.props.invoice.tax) ?
            <span className="sub-details">
              {`$${this.props.invoice.tax}`}
            </span>
          : null }
       </p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 4}}>
        <p className="mb-0 title-detail">{t('INVOICES.subTotal') }{': '}
          { (this.props.invoice.subTotal) ?
            <span className="sub-details">
              {`$${this.props.invoice.subTotal}`}
            </span>
          : null }
       </p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 4}}>
        <p className="mb-0 title-detail">{t('INVOICES.total') }{': '}
          { (this.props.invoice.total) ?
            <span className="sub-details">
              {`$${this.props.invoice.total}`}
            </span>
          : null }
       </p>
      </Col>

      <Col className=" mt-3 mb-3 bg-dark" md={{size: 12}}>
        <p className="title-create mb-0">
          { t('INVOICE_DETAILS.cardInfo') }
        </p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 6}}>
        <p className="mb-0 title-detail">{t('SIGNUP.firstName') }{': '}
          { (this.props.invoice.firstName) ?
            <span className="sub-details">
              {`${this.props.invoice.firstName}`}
            </span>
          : null }
       </p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 6}}>
        <p className="mb-0 title-detail">{t('SIGNUP.lastName') }{': '}
          { (this.props.invoice.lastName) ?
            <span className="sub-details">
              {`${this.props.invoice.lastName}`}
            </span>
          : null }
       </p>
      </Col>

    </Row>
    </div>)}</I18n>);
  }
}

Invoice.propTypes = {
  invoice: PropTypes.object.isRequired,
};

export default Invoice;
