import { combineReducers } from "redux";
import test from './testReducers';
import events from './eventsReducers';
import volunteers from './volunteersReducers';
import userPicklists from './userPicklistReducers'


export default combineReducers({ test, volunteers, userPicklists, events });
