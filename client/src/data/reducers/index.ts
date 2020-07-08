import { combineReducers } from "redux";
import test from './testReducers';
import events from './eventsReducers';


export default combineReducers({ test, events });
