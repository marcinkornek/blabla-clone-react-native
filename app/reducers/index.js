import { combineReducers } from 'redux';

import { rides } from './rides';
import { ride } from './ride';

export default combineReducers({
  rides,
  ride,
});
