import { combineReducers } from "redux";
import events from './eventsReducers';
import volunteers from './volunteersReducers';
import userPicklists from './userPicklistReducers';
import user from './authReducers';

export default combineReducers({ volunteers, userPicklists, events, user });
