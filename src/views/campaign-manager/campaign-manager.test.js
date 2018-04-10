import React from 'react';
import ReactDOM from 'react-dom';
import CamPaignManager from './campaign-manager';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CamPaignManager />, div);
  ReactDOM.unmountComponentAtNode(div);
});
