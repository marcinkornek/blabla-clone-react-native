// utils
import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';
import { store } from './store/store';

// components
import AppDrawer from './containers/shared/app-drawer/app-drawer'
import Register from './containers/current-user/current-user-new/current-user-new'
import CurrentUserEdit from './containers/current-user/current-user-edit/current-user-edit'
import Login from './containers/session/login/login'
import RidesIndex from './containers/rides/rides-index/rides-index'
import RideShow from './containers/rides/ride-show/ride-show'
import RideNew from './containers/rides/ride-new/ride-new'
import requireAuth from './containers/shared/require-auth/require-auth'

const RouterWithRedux = connect()(Router);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="drawer" component={AppDrawer} open={false}>
            <Scene key="main" >
              <Scene key="login" component={Login} title="Login" />
              <Scene key="register" component={Register} title="Register" />
              <Scene key="currentUserEdit" component={requireAuth(CurrentUserEdit)} title="Edit user" />
              <Scene key="ridesIndex" component={RidesIndex} title="All rides" />
              <Scene key="rideShow" component={RideShow} />
              <Scene key="rideNew" component={requireAuth(RideNew)} />
            </Scene>
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}

export default App;
