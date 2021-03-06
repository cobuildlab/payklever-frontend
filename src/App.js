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
  Route,
} from 'react-router-dom';
import {
  Login,
  Signup,
  TermsPrivacy,
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
      user: this.checkStartRute(),
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

    try {
      tidioChatApi.on('ready', () => {
        this.setTidioUser(this.state.user);
      });
    } catch (e) {
      // console.log(e);
    }

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
          <Route path="/terms-privacy" component={TermsPrivacy}></Route>
          <NotAuthRoute exact path="/signup" component={Signup}/>
          <NotAuthRoute exact path="/login" component={Login}/>
          <NotAuthRoute exact path="/login/email-confirmation" component={Login}/>
          <NotAuthRoute exact path="/login/email-confirmation-error" component={Login}/>
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

  /*
  checks the start page's route on first load to get the cached user or to remove it from localStorage
   */
  checkStartRute() {
    if (this.props.location.pathname === '/login/email-confirmation' || this.props.location.pathname === '/login/email-confirmation-error' ||
      this.props.location.pathname.includes('/reset-password/')) {
      // remove session for these routes on page start or reload
      authStore.deleteCachedUser();
      return {};
    }

    // get the user from localStorage
    const cachedUser = authStore.getCachedUser();
    if (cachedUser.token) appActions.setCachedUser(cachedUser);
    return cachedUser || {};
  }

  setTidioUser = (user) => {
    if (!user.id) return;

    try {
      tidioChatApi.setVisitorData({
        distinct_id: user.id,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
      });
    } catch (e) {
      // console.log(e);
    }
  }

  setTidiotags = (tags, user) => {
    if (!user.id) return;

    try {
      tidioChatApi.setVisitorData({
        tags: tags,
      });
    } catch (e) {
      // console.log(e);
    }
  }
}

export default App;
