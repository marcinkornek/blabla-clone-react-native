// utils
import thunk from 'redux-thunk'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'
import { createStore, applyMiddleware, compose } from 'redux';

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

export const store = compose(
  applyMiddleware(
    thunk,
    axiosMiddleware(client)
  ),
)(createStore)(Reducers);
