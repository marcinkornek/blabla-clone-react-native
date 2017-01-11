// utils
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

// reducers
import { currentUser } from './current-user';
import { rides } from './rides';
import { ride } from './ride';
import { rideOptions } from './ride-options';
import { session } from './session';

export default combineReducers({
  currentUser,
  rides,
  ride,
  rideOptions,
  session,
  form: formReducer
});
