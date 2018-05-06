import React from 'react';
import ReactDOM from 'react-dom';
import CamPaignManager from './campaign-manager';
import { Route } from "react-router-dom";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Route> <CamPaignManager /> </Route>, div);
  ReactDOM.unmountComponentAtNode(div);
});
