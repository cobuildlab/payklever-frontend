import React, { Component } from 'react';
import * as appActions from './App.actions';
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

class App extends Component {
  constructor(props) {
    super(props);
    this.getCachedUser();
  }

  componentDidMount() {
    this.setUser = authStore.subscribe('setUser', (user) => {
        if (!user) this.props.history.push('/login');
    });
  }

  componentWillUnmount() {
    this.setUser.unsubscribe();
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
