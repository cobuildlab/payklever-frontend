import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { I18n } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';

class LineChart extends Component {
  render() {
    return (
      <I18n>{(t, { i18n }) => (<div>
      <CSSTransition in={Array.isArray(this.props.data.datasets)} timeout={500} classNames="fade-in" unmountOnExit>
        <Line data={this.props.data} />
      </CSSTransition>
      </div>)}</I18n>);
  }
}

LineChart.propTypes = {
  data: PropTypes.object.isRequired,
};

export default LineChart;
