import React from 'react';
import Flux from '@4geeksacademy/react-flux-dash';
import {
  AuthStore
} from './stores/index';
import {
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
import appActions from './App.actions';

class App extends Flux.View {
  constructor(props) {
    super(props);
    this.state = {
      user: this.getCachedUser(),
    };

    this.bindStore(AuthStore, 'USER_ADDED', function() {
      this.state.user = AuthStore.getUser();
      props.history.push('/client');
    });

    if (this.state.user.token) appActions.setCachedUser(this.state.user);
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

  getCachedUser() {
    return (typeof localStorage.getItem('user') === 'string') ?
      JSON.parse(localStorage.getItem('user')) :
      {};
  }
}

export default App;
