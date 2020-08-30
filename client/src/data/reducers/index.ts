import { combineReducers } from "redux";
import events from './eventsReducers';
import volunteers from './volunteersReducers';
import eventPicklists from './eventPicklistReducers'
import user from './authReducers';


export default combineReducers({ volunteers, eventPicklists, events, user });
