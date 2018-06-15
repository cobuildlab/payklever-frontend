import React, { Component } from 'react';
import * as appActions from './App.actions';
import { i18next } from './i18n';
import { toast, ToastContainer } from 'react-toastify';
import './App.css';
import {
  authStore
} from './stores';
import {
  Redirect,
  Switch,
} from 'react-router-dom';
import {
  Login,
  Signup,
  RecoverPassword,
  ResetPassword,
  AdminPages,
  ClientPages,
  NotAuthRoute,
  AdminRoute,
  ClientRoute,
} from './views';
const tidioChatApi = window.tidioChatApi;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    }

    props.history.listen((location, action) => {
      const currentRoute = `Route: ${location.pathname}`;
      this.setTidiotags([currentRoute], this.state.user);
    });
  }

  componentDidMount() {
    this.setUser = authStore.subscribe('setUser', (user) => {
      if (!user) {
        toast.dismiss();
        toast.success(i18next.t('APP.youHaveLoggedOut'));
        this.deleteAccounts();
        this.props.history.push('/login');
      } else {
        this.setState({ user });
        this.setTidioUser(this.state.user);
      }
    });

    tidioChatApi.on('ready', () => {
      this.setTidioUser(this.state.user);
    });

    this.getCachedUser();

    document.tidioChatLang = i18next.language.split('-')[0];
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
        <ToastContainer/>
        <Switch>
          <NotAuthRoute exact path="/signup" component={Signup}/>
          <NotAuthRoute exact path="/login" component={Login}/>
          <NotAuthRoute exact path="/recover-password" component={RecoverPassword}/>
          <NotAuthRoute exact path="/reset-password/:code" component={ResetPassword}/>
          <AdminRoute path="/admin" component={AdminPages}/>
          <ClientRoute path="/client" component={ClientPages}/>
          <Redirect to='/client'/>
        </Switch>
      </div>
    );
  }

  deleteAccounts() {
    setTimeout(() => {
      appActions.deleteAccounts();
    })
  }

  getCachedUser() {
    const cachedUser = authStore.getCachedUser();

    if (cachedUser.token) appActions.setCachedUser(cachedUser);
  }

  setTidioUser = (user) => {
    if (!user.id) return;

    tidioChatApi.setVisitorData({
      distinct_id: user.id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
    });
  }

  setTidiotags = (tags, user) => {
    if (!user.id) return;

    tidioChatApi.setVisitorData({
      tags: tags,
    });
  }
}

export default App;
