import { combineReducers } from "redux";
import test from './testReducers';
import volunteers from './volunteersReducers';

export default combineReducers({test, volunteers});
