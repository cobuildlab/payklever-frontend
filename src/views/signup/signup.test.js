import React from 'react';
import ReactDOM from 'react-dom';
import i18next from '../../i18n/i18n';
import Signup from './signup';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Signup />, div);
  ReactDOM.unmountComponentAtNode(div);
});
