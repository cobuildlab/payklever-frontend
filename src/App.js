import React from 'react';
import Flux from '@4geeksacademy/react-flux-dash';
import i18next from './i18n/i18n';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import './App.css';
import {
  Login,
  Signup,
  Base,
} from './views/index';

class App extends Flux.View {
  render() {
    return (
    <Router>
      <div>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/login" component={Login}/>
        <Route path="/pages" component={Base}/>
      </div>
    </Router>
    );
  }
}

export default App;
