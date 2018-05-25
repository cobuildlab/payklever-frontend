import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/fontawesome-free-solid';

class Footer extends Component {
  render() {
    return (<div style={{marginTop: '100px'}}>
      <footer className="footer">
        <div className="container">
          <p style={{margin: 0}} className="text-center text-white">
            {'Payklever'}{' '}
            <FontAwesomeIcon icon={faCopyright}/>{' '}
            {'2018'}
          </p>
        </div>
      </footer>
      </div>);
  }
}

export default Footer;
