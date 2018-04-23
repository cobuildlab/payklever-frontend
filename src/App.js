import React from 'react';
import Flux from '@4geeksacademy/react-flux-dash';
import appActions from './App.actions';
import './App.css';
import {
  authStore
} from './stores';
import {
  Redirect,
} from 'react-router-dom';
import {
  Login,
  Signup,
  AdminPages,
  ClientPages,
  NotAuthRoute,
  AdminRoute,
  ClientRoute,
} from './views';

class App extends Flux.View {
  constructor(props) {
    super(props);
    this.getCachedUser();

    this.bindStore(authStore, 'USER_REMOVED', function() {
      props.history.push('/login');
    });
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
    const cachedUser = authStore.getCachedUser();

    if (cachedUser.token) appActions.setCachedUser(cachedUser);
  }
}

export default App;
