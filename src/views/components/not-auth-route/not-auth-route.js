import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { authStore } from '../../../stores';

const NotAuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    (authStore.isAuthenticated() === false)
    ? <Component {...props} /> :
    <Redirect to={{
        pathname: '/client',
        state: { from: props.location }
      }} />
  )} />
)

export default NotAuthRoute;
