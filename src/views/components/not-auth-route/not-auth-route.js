import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { AuthStore } from '../../../stores';

const NotAuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    (AuthStore.isAuthenticated() === false)
    ? <Component {...props} /> :
    <Redirect to={{
        pathname: '/client',
        state: { from: props.location }
      }} />
  )} />
)

export default NotAuthRoute;
