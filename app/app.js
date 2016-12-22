// utils
import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'
import { APIRoot } from './constants/constants'

import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

import RidesIndex from './containers/rides/rides-index/rides-index'

const RouterWithRedux = connect()(Router);
import Reducers from './reducers/index';

const client = axios.create({
   baseURL: APIRoot,
   headers: {
     'Accept': 'application/vnd.blabla-clone-v1+json',
     'Content-Type': 'application/json'
   },
   responseType: 'json'
})

const store = compose(
  applyMiddleware(
    thunk,
    axiosMiddleware(client)
  ),
)(createStore)(Reducers);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="rides-index" component={RidesIndex} open={false} />
        </RouterWithRedux>
      </Provider>
    );
  }
}

export default App;
