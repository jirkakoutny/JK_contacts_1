import { combineReducers } from 'redux';

import app from './reducers/app';
import auth from './reducers/auth';
import nav from './reducers/nav';

const reducer = combineReducers({
  app,
  auth,
  nav
});

export default reducer;
