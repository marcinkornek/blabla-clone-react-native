// utils
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// reducers
import { modal } from './modal';
import { settings } from './settings';
import { users } from './users';
import { user } from './user';
import { cars } from './cars';
import { car } from './car';
import { carOptions } from './car-options';
import { currentUser } from './current-user';
import { rides } from './rides';
import { ridesAsPassenger } from './rides-as-passenger';
import { ridesAsDriver } from './rides-as-driver';
import { ridesFilters } from './rides-filters';
import { ridesAsDriverFilters } from './rides-as-driver-filters';
import { ridesAsPassengerFilters } from './rides-as-passenger-filters';
import { ride } from './ride';
import { rideOptions } from './ride-options';
import { session } from './session';
import { notificationActive } from './notification-active';
import { notifications } from './notifications';

export default combineReducers({
  modal,
  settings,
  currentUser,
  users,
  user,
  cars,
  car,
  carOptions,
  rides,
  ridesAsPassenger,
  ridesAsDriver,
  ridesFilters,
  ridesAsDriverFilters,
  ridesAsPassengerFilters,
  ride,
  rideOptions,
  session,
  notificationActive,
  notifications,
  form: formReducer
});
