import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { AuthStore } from '../../../stores';

const ClientRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    (AuthStore.isClient() === true && AuthStore.isAuthenticated() === true)
    ? <Component {...props} /> :
    ((AuthStore.isClient() === true && AuthStore.isAuthenticated() === false) ||
    (AuthStore.isClient() === false && AuthStore.isAuthenticated() === false) )
    ? <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} /> : <Redirect to={{
          pathname: '/admin', // Redirect to admin home
          state: { from: props.location }
        }} />
  )} />
)

export default ClientRoute;
