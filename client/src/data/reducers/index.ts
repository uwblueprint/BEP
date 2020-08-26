import { combineReducers } from "redux";
import test from './testReducers';
import events from './eventsReducers';
import volunteers from './volunteersReducers';
import picklists from './picklistReducers'

export default combineReducers({test, volunteers, picklists, events});
