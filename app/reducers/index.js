import { combineReducers } from 'redux';

import { rides } from './rides';
import { ride } from './ride';
import { session } from './session';

export default combineReducers({
  rides,
  ride,
  session,
});
