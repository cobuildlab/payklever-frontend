import React from 'react';
import Flux from '@4geeksacademy/react-flux-dash';
import {
  AuthStore
} from './stores/index';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import './App.css';
import {
  Login,
  Signup,
  AdminPages,
  ClientPages,
} from './views/index';
import {
  NotAuthRoute,
  AdminRoute,
  ClientRoute,
} from './views/index';

class App extends Flux.View {
  constructor() {
    super();
    this.state = {
      user: AuthStore.getUser(),
    };
  }

  render() {
    if (this.props.match.isExact) {
      return <Redirect to="/client" />
    }

    return (
      <div>
        <NotAuthRoute exact path="/signup" component={Signup}/>
        <NotAuthRoute exact path="/login" component={Login}/>
        <AdminRoute path="/admin" component={AdminPages}/>
        <ClientRoute path="/client" component={ClientPages}/>
      </div>
    );
  }
}

export default App;
