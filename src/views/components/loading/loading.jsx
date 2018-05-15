import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { RingLoader } from 'react-spinners';

class Loading extends Component {

  render() {
    return (
      <CSSTransition in={this.props.isLoading} timeout={500} classNames="fade-in" unmountOnExit>
        <div className="App-overlay">
          <div style={{width: '200px'}} className="App-center-loading">
            <h4 className="text-center">
              { this.props.loadingMessage }
            </h4>
            <RingLoader size={200} color={'#75c044'} loading={true}/>
          </div>
        </div>
      </CSSTransition>);
  }
}

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  loadingMessage: PropTypes.string,
};

export default Loading;
