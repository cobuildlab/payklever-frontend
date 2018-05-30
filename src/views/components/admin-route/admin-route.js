import React from 'react'
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { authStore } from '../../../stores';

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    (authStore.isAdmin() === true && authStore.isAuthenticated() === true)
    ? <Component {...props} /> :
    ((authStore.isAdmin() === true && authStore.isAuthenticated() === false) ||
    (authStore.isAdmin() === false && authStore.isAuthenticated() === false) )
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
