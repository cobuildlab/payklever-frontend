import React from 'react';
import ReactDOM from 'react-dom';
import i18next from '../../i18n/i18n';
import Login from './login';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Login />, div);
  ReactDOM.unmountComponentAtNode(div);
});
