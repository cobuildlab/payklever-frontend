import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';

class Promotion extends Component {

  render() {
    return (<I18n>{(t, { i18n }) => (<div>

    <Row>
      <Col className=" mt-3 mb-3 bg-dark" md={{size: 12}}>
        <p className="title-create mb-0">
          { t('PROMOTION_DETAILS.userInfo') }
        </p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 12}}>
        <p className="mb-0 title-detail">
          { t('PROMOTION_DETAILS.nameAndSurname') }{': '}
          {(this.props.promotion.User) ?
              <span className="sub-details">
                {`${this.props.promotion.User.firstName} ${this.props.promotion.User.lastName}`}
              </span>
          : null}
        </p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 12}}>
        <p className="mb-0 title-detail">
          { t('PROMOTION_DETAILS.email') }{': '}
          {(this.props.promotion.User) ?
              <span className="sub-details">
                {`${this.props.promotion.User.email}`}
              </span>
          : null}
        </p>
      </Col>

      <Col className=" mt-3 mb-3 bg-dark" md={{size: 12}}>
        <p className="title-create mb-0">
          { t('PROMOTION_DETAILS.promotionInfo') }
        </p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 12}}>
        <p className="mb-0 title-detail">{t('PROMOTION_DETAILS.name') }{': '}
          { (this.props.promotion.name) ?
            <span className="sub-details">
              {`${this.props.promotion.name}`}
            </span>
          : null }
       </p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 12}}>
        <p className="mb-0 title-detail">{t('PROMOTION_DETAILS.description') }{': '}
          { (this.props.promotion.description) ?
            <span className="sub-details">
              {`${this.props.promotion.description}`}
            </span>
          : null }
       </p>
      </Col>

      <Col className=" mt-3 mb-3" md={{size: 4}}>
        <p className="mb-0 title-detail">{t('PROMOTION_DETAILS.type') }{': '}
          { (this.props.promotion.type) ?
            <span className="sub-details">
              {t(`PROMOTION_TYPES.${this.props.promotion.type}`)}
            </span>
          : null }
       </p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 4}}>
        <p className="mb-0 title-detail">{t('PROMOTION_DETAILS.amount') }{': '}
          { (this.props.promotion.amount) ?
            <span className="sub-details">
              {this.props.promotion.amount}
            </span>
          : null }
       </p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 4}}>
        <p className="mb-0 title-detail">{t('PROMOTION_DETAILS.status') }{': '}
          { (this.props.promotion.amount) ?
            <span className="sub-details">
              {t(`PROMOTION_STATUS.${this.props.promotion.status}`)}
            </span>
          : null }
       </p>
      </Col>

      <Col className=" mt-3 mb-3" md={{size: 4}}>
        <p className="mb-0 title-detail">{t('PROMOTION_DETAILS.startDate') }{': '}
          { (this.props.promotion.startDate) ?
            <span className="sub-details">
              {this.props.promotion.startDate}
            </span>
          : null }
       </p>
      </Col>
      <Col className=" mt-3 mb-3" md={{size: 4}}>
        <p className="mb-0 title-detail">{t('PROMOTION_DETAILS.endDate') }{': '}
          { (this.props.promotion.endDate) ?
            <span className="sub-details">
              {this.props.promotion.endDate}
            </span>
          : null }
       </p>
      </Col>

    </Row>
    </div>)}</I18n>);
  }
}

Promotion.propTypes = {
  promotion: PropTypes.object.isRequired,
};

export default Promotion;
