import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import {
  Card,
  CardText,
  CardTitle,
  Row,
  Col,
} from 'reactstrap';

class LineChart extends Component {
  render() {
    return (
      <I18n>{(t, { i18n }) => (<div>
      <CSSTransition in={(this.props.metrics.smsCount >= 0)} timeout={500} classNames="fade-in" unmountOnExit>
        <Row>
          <Col className=" mt-3 mb-3 bg-dark" md={{size: 12}}>
            <p className="title-create mb-0">
              { t('CAMPAIGN_METRICS.metrics') }
            </p>
          </Col>
          <Col sm="6" md="3">
            <Card body className="text-center p-4">
              <CardText>{ t('CAMPAIGN_METRICS.ctr') }</CardText>
              <CardTitle className="p-0 mb-0 font-weight-bold">
                {`${this.props.metrics.ctr || 0}%`}
              </CardTitle>
            </Card>
          </Col>
          <Col sm="6" md="3">
            <Card body className="text-center p-4">
              <CardText>{ t('CAMPAIGN_METRICS.ppc') }</CardText>
              <CardTitle className="p-0 mb-0 font-weight-bold">
                {`${this.props.metrics.ppc || 0}%`}
              </CardTitle>
            </Card>
          </Col>
          <Col sm="6" md="3">
            <Card body className="text-center p-4">
              <CardText>{ t('CAMPAIGN_METRICS.smsCount') }</CardText>
              <CardTitle className="p-0 mb-0 font-weight-bold">
                {this.props.metrics.smsCount}
              </CardTitle>
            </Card>
          </Col>
          <Col sm="6" md="3">
            <Card body className="text-center p-4">
              <CardText>{ t('CAMPAIGN_METRICS.viewsCount') }</CardText>
              <CardTitle className="p-0 mb-0 font-weight-bold">
                {this.props.metrics.viewsCount}
              </CardTitle>
            </Card>
          </Col>
      </Row>
      </CSSTransition>
      </div>)}</I18n>);
  }
}

LineChart.propTypes = {
  metrics: PropTypes.object.isRequired,
};

export default LineChart;
