import React from 'react';
import ReactDOM from 'react-dom';
import ClientManager from './client-manager';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ClientManager />, div);
  ReactDOM.unmountComponentAtNode(div);
});
