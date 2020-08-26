import { combineReducers } from "redux";
import test from './testReducers';
import events from './eventsReducers';
import volunteers from './volunteersReducers';
import userPicklists from './userPicklistReducers';
import auth from './authReducers';


export default combineReducers({ test, volunteers, userPicklists, events, auth });
