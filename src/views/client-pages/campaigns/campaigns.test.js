import React from 'react';
import ReactDOM from 'react-dom';
import Campaigns from './campaigns';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Campaigns />, div);
  ReactDOM.unmountComponentAtNode(div);
});
