import { combineReducers } from "redux";
import test from './testReducers';
import volunteers from './volunteersReducers';
import userPicklists from './userPicklistReducers'

export default combineReducers({test, volunteers, userPicklists});
