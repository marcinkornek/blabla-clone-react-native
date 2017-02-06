// utils
import thunk from 'redux-thunk'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'
import { createStore, applyMiddleware, compose } from 'redux';
import update from 'immutability-helper';
import { autoRehydrate } from 'redux-persist';

// constants
import { APIRoot } from '../constants/constants'

// reducers
import Reducers from '../reducers/index';

const client = axios.create({
  baseURL: APIRoot,
  headers: {
    'Accept': 'application/vnd.blabla-clone-v1+json',
    'Content-Type': 'application/json'
  },
  responseType: 'json'
})

client.interceptors.request.use((config) => {
  if (!store.getState().session.item.email) {
    return config;
  } else {
    const { session } = store.getState()
    return update(config, {
      $merge: {
        headers: {
          'X-User-Email': session.item.email,
          'X-User-Token': session.item.access_token
        },
      },
    });
  }
});

export const store = compose(
  applyMiddleware(
    thunk,
    axiosMiddleware(client)
  ),
  autoRehydrate()
)(createStore)(Reducers);
