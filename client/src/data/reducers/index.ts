import { combineReducers } from "redux";
import test from './testReducers';
import volunteers from './volunteersReducers';
import picklists from './picklistReducers'

export default combineReducers({test, volunteers, picklists});
