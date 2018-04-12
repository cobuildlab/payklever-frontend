import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import AdminPages from './admin-pages';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><AdminPages match={{isExact: false}}/></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
