import { combineReducers } from 'redux';

import { currentUser } from './current-user';
import { rides } from './rides';
import { ride } from './ride';
import { session } from './session';

export default combineReducers({
  currentUser,
  rides,
  ride,
  session,
});
