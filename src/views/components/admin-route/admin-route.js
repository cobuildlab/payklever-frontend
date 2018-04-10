import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { AuthStore } from '../../../stores/index';

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    (AuthStore.isAdmin() === true && AuthStore.isAuthenticated() === true)
    ? <Component {...props} /> :
    ((AuthStore.isAdmin() === true && AuthStore.isAuthenticated() === false) ||
    (AuthStore.isAdmin() === false && AuthStore.isAuthenticated() === false) )
    ? <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} /> : <Redirect to={{
          pathname: '/client', // Redirect to client home
          state: { from: props.location }
        }} />
  )} />
)

export default AdminRoute;
