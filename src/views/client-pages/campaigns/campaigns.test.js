import React from 'react';
import ReactDOM from 'react-dom';
import Campaigns from './campaigns';
import { BrowserRouter as Router } from "react-router-dom";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><Campaigns /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
