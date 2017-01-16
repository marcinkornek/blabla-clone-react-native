// utils
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

// reducers
import { users } from './users';
import { cars } from './cars';
import { car } from './car';
import { carOptions } from './car-options';
import { currentUser } from './current-user';
import { rides } from './rides';
import { ride } from './ride';
import { rideOptions } from './ride-options';
import { session } from './session';

export default combineReducers({
  currentUser,
  users,
  cars,
  car,
  carOptions,
  rides,
  ride,
  rideOptions,
  session,
  form: formReducer
});
