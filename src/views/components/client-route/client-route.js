import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { authStore } from '../../../stores';

const ClientRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    (authStore.isClient() === true && authStore.isAuthenticated() === true)
    ? <Component {...props} /> :
    ((authStore.isClient() === true && authStore.isAuthenticated() === false) ||
    (authStore.isClient() === false && authStore.isAuthenticated() === false) )
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
