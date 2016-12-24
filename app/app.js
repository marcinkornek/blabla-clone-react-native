// utils
import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';
import { store } from './store/store';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

import { AppDrawer } from './components/shared/app-drawer/app-drawer'
import RidesIndex from './containers/rides/rides-index/rides-index'
import RideShow from './containers/rides/ride-show/ride-show'

const RouterWithRedux = connect()(Router);


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="drawer" component={AppDrawer} open={false}>
            <Scene key="main" >
              <Scene key="ridesIndex" component={RidesIndex} title="All rides" />
              <Scene key="rideShow" component={RideShow} />
            </Scene>
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}

export default App;
