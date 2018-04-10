import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import Base from './base';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><Base match={{isExact: false}}/></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
